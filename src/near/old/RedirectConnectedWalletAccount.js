/* eslint-disable */
import { Account } from 'near-api-js';
import { PublicKey } from 'near-api-js/lib/utils';
import { baseDecode } from 'borsh';
import { createTransaction } from 'near-api-js/lib/transaction';
import * as qs from 'query-string';
import * as R from 'ramda';
import { decode } from '../../utils/buffer';

export class RedirectConnectedWalletAccount extends Account {
  constructor(walletConnection, connection, accountId) {
    super(connection, accountId);
    this.walletConnection = walletConnection;
  }

  resolveRedirectUrl() {
    return qs.stringifyUrl({
      url: window.location.href,
      query: {
        name: 'My Multisafe',
        multisafeId: 'my-muiltisafe.testnet',
      },
    });
  }

  async signAndSendTransaction(receiverId, actions) {
    const accessKeys = await this.getAccessKeys();
    const walletKeys = this.walletConnection._authData.allKeys;
    const isIncluded = (k) => walletKeys.includes(k.public_key);

    const accessKey = accessKeys.find((key) =>
      isIncluded(key) && this.accessKeyMatchesTransaction(key, receiverId, actions) ? key : null,
    );
    const multisafeId = [
      ...actions.map((x) => R.propOr('', 'name', decode(x.functionCall.args))),
      ...[receiverId],
    ].join`.`;
    const nonce = accessKey.access_key.nonce + 1;
    const publicKey = PublicKey.from(accessKey.public_key);
    const block = await this.connection.provider.block({ finality: 'final' });
    const blockHash = baseDecode(block.header.hash);
    const transaction = createTransaction(
      this.accountId,
      publicKey,
      receiverId,
      nonce,
      actions,
      blockHash,
    );
    await this.walletConnection.requestSignTransactions(
      [transaction],
      this.resolveRedirectUrl(multisafeId),
    );
  }

  accessKeyMatchesTransaction({ access_key: { permission } }, receiverId, actions) {
    if (permission === 'FullAccess') {
      return true;
    }

    if (permission.FunctionCall) {
      const {
        receiver_id: allowedReceiverId,
        method_names: allowedMethods,
      } = permission.FunctionCall;
      if (
        allowedReceiverId === this.accountId &&
        allowedMethods.includes('add_request_and_confirm')
      ) {
        return true;
      }
      if (allowedReceiverId === receiverId) {
        if (actions.length !== 1) {
          return false;
        }
        const [{ functionCall }] = actions;
        return (
          functionCall &&
          (!functionCall.deposit || functionCall.deposit.toString() === '0') &&
          (allowedMethods.length === 0 || allowedMethods.includes(functionCall.methodName))
        );
      }
    }
    return false;
  }
}
