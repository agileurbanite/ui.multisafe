/* eslint-disable */
import BN from 'bn.js';
import { getTransactionLastResult } from 'near-api-js/lib/providers';
import { ArgumentTypeError } from 'near-api-js/lib/utils/errors';

const validateBNLike = (argMap) => {
  const bnLike = 'number, decimal string or BN';
  Object.keys(argMap).forEach((key) => {
    const argValue = argMap[key];
    if (argValue && !BN.isBN(argValue) && Number.isNaN(argValue)) {
      throw new ArgumentTypeError(key, bnLike, argValue);
    }
  });
};

const createContactMethod = (contract, methodName, handler) => {
  Object.defineProperty(contract, methodName, {
    writable: false,
    enumerable: true,
    value: handler,
  });
};

export class Contract {
  constructor(account, contractId, options) {
    this.account = account;
    this.contractId = contractId;
    const { viewMethods = [], changeMethods = [] } = options;

    viewMethods.forEach((methodName) => {
      createContactMethod(this, methodName, async (payload = {}, options = {}) =>
        this.account.viewFunction(this.contractId, methodName, payload, options),
      );
    });

    changeMethods.forEach((methodName) => {
      createContactMethod(this, methodName, async ({ payload = {}, gas, amount, callbackUrl }) => {
        validateBNLike({ gas, amount });
        const rawResult = await this.account.functionCall(
          this.contractId,
          methodName,
          payload,
          gas,
          amount,
          callbackUrl,
        );
        return getTransactionLastResult(rawResult);
      });
    });
  }
}
