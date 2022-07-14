import { Account, Contract } from 'near-api-js';

import { config } from '../../../near/config';

export const getMultisafeFactoryContract = (state) => {
    const walletType = state.general.user.walletType;
    const accountId = state.general.user.accountId;
    const near = state.general.entities.near;
    const wallet = state.general.entities.wallet;

    const account = (walletType === 'my-near-wallet' || walletType === 'near-wallet')
        ? wallet.account()
        : new Account(near.connection, accountId);

    return new Contract(account, config.multisafeFactoryId, {
        viewMethods: [],
        changeMethods: ['create'],
    });
};
