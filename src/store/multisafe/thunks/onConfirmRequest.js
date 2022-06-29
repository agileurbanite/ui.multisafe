import { thunk } from 'easy-peasy';

import { config } from '../../../near/config';
import { signTransactionByLedger } from '../helpers/signTransactionByLedger';

const ATTACHED_GAS = config.gas.default;

const callContractChangeMethod = (contract, requestId, callbackUrl) =>
    contract.confirm({ 
        args: {
            request_id: requestId
        },
        gas: ATTACHED_GAS,
        callbackUrl
    });

const signTxByNearWallet = (contract, requestId) => {
    callContractChangeMethod(contract, requestId);
};

const signTxByLedger = async (contract, requestId, multisafeId, state, actions) => {
    await signTransactionByLedger({
        actionName: 'Confirm Request',
        state,
        actions,
        contractMethod: () => callContractChangeMethod(contract, requestId),
        callback: async () => {
            // Here we load data to update UI according to the last changes
            // TODO move onMountDashboard functions into helper - it can mislead devs in the future
            await actions.multisafe.onMountDashboard(multisafeId);
        },
    });
};


const prepareBatchConfirmation = ({ contract, requests, actions }) => {
    actions.general.setTemporaryData({
        redirectAction: redirectActions.batchConfirm,
        multisafeId: contract.contractId,
        batchConfirm: {
            args: {
                args: {
                    request_id: requests[1].requestId
                }, 
                gas: ATTACHED_GAS,
                callbackUrl: `${window.location.origin}${getRoute.dashboard(contract.contractId)}`
            }
        },
    });

    const callbackUrl = getRoute.callbackUrl({ redirectAction: redirectActions.batchConfirm });
    callContractChangeMethod(contract, requests[0].requestId, callbackUrl);
};
export const onConfirmRequest = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
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
