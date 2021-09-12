import { thunk } from 'easy-peasy';
import { utils } from 'near-api-js';
import { signTransactionByLedger } from '../helpers/signTransactionByLedger';

const addTransferRequest = (contract, withApprove, recipientId, amount) => {
  const method = withApprove ? 'add_request_and_confirm' : 'add_request';

  return contract[method]({
    args: {
      request: {
        receiver_id: recipientId,
        actions: [{ type: 'Transfer', amount: utils.format.parseNearAmount(amount) }],
      },
    },
  });
};

const signTxByLedger = async (contract, withApprove, recipientId, amount, state, actions) => {
  await signTransactionByLedger({
    actionName: 'Transfer',
    state,
    actions,
    contractMethod: () => addTransferRequest(contract, withApprove, recipientId, amount),
    callback: async () => {
      // TODO move onMountDashboard functions into helper - it can mislead devs in the future
      await actions.multisafe.onMountDashboard();
    },
  });
};

export const onTransferTokens = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  const { onClose } = payload;
  const { recipientId, amount, withApprove } = payload.data;

  const state = getStoreState();
  const isNearWallet = state.general.selectors.isNearWallet;
  const contract = state.multisafe.entities.contract;

  const actions = getStoreActions();

  isNearWallet
    ? addTransferRequest(contract, withApprove, recipientId, amount)
    : await signTxByLedger(contract, withApprove, recipientId, amount, state, actions);

  onClose();
});
