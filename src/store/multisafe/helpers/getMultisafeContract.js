import { Account, Contract } from 'near-api-js';

export const getMultisafeContract = (state, multisafeId) => {
    const walletType = state.general.user.walletType;
    const accountId = state.general.user.accountId;
    const near = state.general.entities.near;
    const wallet = state.general.entities.wallet;

    const account = ((walletType === 'my-near-wallet' || walletType === 'near-wallet') && wallet)
        ? wallet.account()
        : new Account(near?.connection, accountId);

    return new Contract(account, multisafeId, {
        viewMethods: [
            'get_members',
            'get_request',
            'get_num_confirmations',
            'list_request_ids',
            'get_confirmations',
        ],
        changeMethods: ['add_request', 'add_request_and_confirm', 'confirm', 'delete_request'],
    });
};
