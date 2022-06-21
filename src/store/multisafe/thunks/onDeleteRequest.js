import BN from 'bn.js';
import { thunk } from 'easy-peasy';

import { signTransactionByLedger } from '../helpers/signTransactionByLedger';

const ATTACHED_GAS = new BN('100000000000000');

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
    const { requestId } = payload;

    const state = getStoreState();
    const isNearWallet = state.general.selectors.isNearWallet;
    const contract = state.multisafe.entities.contract;
    const multisafeId = state.multisafe.general.multisafeId;

    const actions = getStoreActions();

    isNearWallet
        ? signTxByNearWallet(contract, requestId)
        : await signTxByLedger(contract, requestId, multisafeId, state, actions);
});
