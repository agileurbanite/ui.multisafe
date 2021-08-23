import { Contract } from 'near-api-js';
import { config } from '../../../near/config';

export const getMultisafeFactoryContract = (store) => {
  const walletAccount = store.general.entities.wallet.account();
  return new Contract(walletAccount, config.multisafeFactoryId, {
    viewMethods: [],
    changeMethods: ['create'],
  });
};
