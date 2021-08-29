import { thunk } from 'easy-peasy';
import { signTransactionByLedger } from '../helpers/signTransactionByLedger';

const deleteRequest = (contract, requestId) =>
  contract.delete_request({ args: { request_id: requestId } });

const signTxByNearWallet = (contract, requestId) => {
  deleteRequest(contract, requestId);
};

const signTxByLedger = async (contract, requestId, state, actions) => {
  await signTransactionByLedger({
    actionName: 'Delete Request',
    state,
    actions,
    contractMethod: () => deleteRequest(contract, requestId),
    callback: async () => {
      // TODO move onMountDashboard functions into helper - it can mislead devs in the future
      await actions.multisafe.onMountDashboard();
    },
  });
};

export const onDeleteRequest = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  const { requestId } = payload;

  const state = getStoreState();
  const isNearWallet = state.general.selectors.isNearWallet;
  const contract = state.multisafe.entities.contract;

  const actions = getStoreActions();

  isNearWallet
    ? signTxByNearWallet(contract, requestId)
    : await signTxByLedger(contract, requestId, state, actions);
});
