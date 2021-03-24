/* eslint-disable */
import { baseDecode } from 'borsh';
import BN from 'bn.js';
import { Account } from 'near-api-js/lib/account';
import { createTransaction, functionCall } from 'near-api-js/lib/transaction';
import { PositionalArgsError } from 'near-api-js/lib/utils/errors';
import { PublicKey } from 'near-api-js/lib/utils';

const MULTISIG_HAS_METHOD = 'add_request_and_confirm';
const DEFAULT_FUNC_CALL_GAS = new BN('30000000000000');

export class ConnectedWalletAccount extends Account {
  walletConnection;

  constructor(walletConnection, connection, accountId) {
    super(connection, accountId);
    this.walletConnection = walletConnection;
  }

  // Overriding Account methods
  async signAndSendTransaction(receiverId, actions, callbackUrl) {
    const localKey = await this.connection.signer.getPublicKey(
      this.accountId,
      this.connection.networkId,
    );
    let accessKey = await this.accessKeyForTransaction(receiverId, actions, localKey);
    if (!accessKey) {
      throw new Error(`Cannot find matching key for transaction sent to ${receiverId}`);
    }

    if (localKey && localKey.toString() === accessKey.public_key) {
      try {
        return await super.signAndSendTransaction(receiverId, actions);
      } catch (e) {
        if (e.type === 'NotEnoughBalance') {
          accessKey = await this.accessKeyForTransaction(receiverId, actions);
        } else {
          throw e;
        }
      }
    }

    const block = await this.connection.provider.block({ finality: 'final' });
    const blockHash = baseDecode(block.header.hash);

    const publicKey = PublicKey.from(accessKey.public_key);
    // TODO: Cache & listen for nonce updates for given access key
    const nonce = accessKey.access_key.nonce + 1;
    const transaction = createTransaction(
      this.accountId,
      publicKey,
      receiverId,
      nonce,
      actions,
      blockHash,
    );
    await this.walletConnection.requestSignTransactions([transaction], callbackUrl); // ВСТАВИТИ СЮДИ

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Failed to redirect to sign transaction'));
      }, 1000);
    });

    // TODO: Aggregate multiple transaction request with "debounce".
    // TODO: Introduce TrasactionQueue which also can be used to watch for status?
  }

  validateArgs(args) {
    const isUint8Array = args.byteLength !== undefined && args.byteLength === args.length;
    if (isUint8Array) return;
    if (Array.isArray(args) || typeof args !== 'object') {
      throw new PositionalArgsError();
    }
  }

  async functionCall(
    contractId,
    methodName,
    args,
    gas = DEFAULT_FUNC_CALL_GAS,
    amount,
    callbackUrl,
  ) {
    args = args || {};
    this.validateArgs(args);
    return this.signAndSendTransaction(
      contractId,
      [functionCall(methodName, args, gas, amount)],
      callbackUrl,
    );
  }

  /**
   * Check if given access key allows the function call or method attempted in transaction
   * @param accessKey Array of {access_key: AccessKey, public_key: PublicKey} items
   * @param receiverId The NEAR account attempting to have access
   * @param actions The action(s) needed to be checked for access
   */
  async accessKeyMatchesTransaction(accessKey, receiverId, actions) {
    const {
      access_key: { permission },
    } = accessKey;
    if (permission === 'FullAccess') {
      return true;
    }

    if (permission.FunctionCall) {
      const {
        receiver_id: allowedReceiverId,
        method_names: allowedMethods,
      } = permission.FunctionCall;
      /********************************
       Accept multisig access keys and let wallets attempt to signAndSendTransaction
       If an access key has itself as receiverId and method permission add_request_and_confirm,
       then it is being used in a wallet with multisig contract:
       https://github.com/near/core-contracts/blob/671c05f09abecabe7a7e58efe942550a35fc3292/multisig/src/lib.rs#L149-L153
       ********************************/
      if (allowedReceiverId === this.accountId && allowedMethods.includes(MULTISIG_HAS_METHOD)) {
        return true;
      }
      if (allowedReceiverId === receiverId) {
        if (actions.length !== 1) {
          return false;
        }
        const [{ functionCall }] = actions;
        return (
          functionCall &&
          (!functionCall.deposit || functionCall.deposit.toString() === '0') && // TODO: Should support charging amount smaller than allowance?
          (allowedMethods.length === 0 || allowedMethods.includes(functionCall.methodName))
        );
        // TODO: Handle cases when allowance doesn't have enough to pay for gas
      }
    }
    // TODO: Support other permissions than FunctionCall

    return false;
  }

  /**
   * Helper function returning the access key (if it exists) to the receiver that grants the designated permission
   * @param receiverId The NEAR account seeking the access key for a transaction
   * @param actions The action(s) sought to gain access to
   * @param localKey A local public key provided to check for access
   * @returns Promise<any>
   */
  async accessKeyForTransaction(receiverId, actions, localKey) {
    const accessKeys = await this.getAccessKeys();

    if (localKey) {
      const accessKey = accessKeys.find((key) => key.public_key === localKey.toString());
      if (accessKey && (await this.accessKeyMatchesTransaction(accessKey, receiverId, actions))) {
        return accessKey;
      }
    }

    const walletKeys = this.walletConnection._authData.allKeys;
    for (const accessKey of accessKeys) {
      if (
        walletKeys.indexOf(accessKey.public_key) !== -1 &&
        (await this.accessKeyMatchesTransaction(accessKey, receiverId, actions))
      ) {
        return accessKey;
      }
    }

    return null;
  }
}
