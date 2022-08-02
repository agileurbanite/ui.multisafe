import { thunk } from 'easy-peasy';

import { config } from '../../../near/config';
import { signTransactionByLedger } from '../helpers/signTransactionByLedger';

const ATTACHED_GAS = config.gas.default;

const deleteRequest = (contract, requestId) =>
    contract.delete_request({ args: { request_id: requestId }, gas: ATTACHED_GAS });

const signTxByNearWallet = (contract, requestId) => {
    deleteRequest(contract, requestId);
};

const signTxByLedger = async (contract, requestId, multisafeId, state, actions) => {
    await signTransactionByLedger({
        actionName: 'Delete Request',
        state,
        actions,
        contractMethod: () => deleteRequest(contract, requestId),
        callback: async () => {
            // Here we load data to update UI according to the last changes
            // TODO move onMountDashboard functions into helper - it can mislead devs in the future
            await actions.multisafe.onMountDashboard(multisafeId);
        },
    });
};

export const onDeleteRequest = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
    const { requestId, selectedWalletId } = payload;

    const state = getStoreState();
    const contract = state.multisafe.entities.contract;
    const multisafeId = state.multisafe.general.multisafeId;

    const actions = getStoreActions();

    switch (selectedWalletId) {
        case 'near-wallet':
        case 'my-near-wallet':
            signTxByNearWallet(contract, requestId);
            break;
        case 'ledger':
            await signTxByLedger(contract, requestId, multisafeId, state, actions);
            break;
        default:
            throw Error(`Unsupported wallet selected: '${selectedWalletId}'`);
    }
});
