import { thunk } from 'easy-peasy';
import { signTransactionByLedger } from '../helpers/signTransactionByLedger';

const callContractChangeMethod = (contract, requestId) =>
  contract.confirm({ args: { request_id: requestId } });

const signTxByNearWallet = (contract, requestId) => {
  callContractChangeMethod(contract, requestId);
};

const signTxByLedger = async (contract, requestId, state, actions) => {
  await signTransactionByLedger({
    actionName: 'Confirm Request',
    state,
    actions,
    contractMethod: () => callContractChangeMethod(contract, requestId),
    callback: async () => {
      // TODO move onMountDashboard functions into helper - it can mislead devs in the future
      await actions.multisafe.onMountDashboard();
    },
  });
};

export const onConfirmRequest = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  const { requestId } = payload;

  const state = getStoreState();
  const isNearWallet = state.general.selectors.isNearWallet;
  const contract = state.multisafe.entities.contract;

  const actions = getStoreActions();

  isNearWallet
    ? signTxByNearWallet(contract, requestId)
    : await signTxByLedger(contract, requestId, state, actions);
});
