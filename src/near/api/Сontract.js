/* eslint-disable */
import BN from 'bn.js';
import { getTransactionLastResult } from 'near-api-js/lib/providers';
import { ArgumentTypeError } from 'near-api-js/lib/utils/errors';

const validateBNLike = (argMap) => {
  const bnLike = 'number, decimal string or BN';
  Object.keys(argMap).forEach((key) => {
    const argValue = argMap[key];
    if (argValue && !BN.isBN(argValue) && isNaN(argValue)) {
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

// viewMethods.forEach((methodName) => {
//   Object.defineProperty(this, methodName, {
//     writable: false,
//     enumerable: true,
//     value: async (args = {}, options = {}, ...ignored) => {
//       if (ignored.length || !(isObject(args) || isUint8Array(args)) || !isObject(options)) {
//         throw new PositionalArgsError();
//       }
//       return this.account.viewFunction(this.contractId, methodName, args, options);
//     },
//   });
// });
//
// changeMethods.forEach((methodName) => {
//   Object.defineProperty(this, methodName, {
//     writable: false,
//     enumerable: true,
//     value: async (args = {}, gas, amount, ...ignored) => {
//       if (ignored.length || !(isObject(args) || isUint8Array(args))) {
//         throw new PositionalArgsError();
//       }
//       validateBNLike({ gas, amount });
//       const rawResult = await this.account.functionCall(
//         this.contractId,
//         methodName,
//         args,
//         gas,
//         amount,
//       );
//       return getTransactionLastResult(rawResult);
//     },
//   });
// });
