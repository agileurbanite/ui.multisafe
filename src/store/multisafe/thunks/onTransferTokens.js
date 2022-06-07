import * as nearApiJs from 'near-api-js';
import { thunk } from 'easy-peasy';
import { signTransactionByLedger } from '../helpers/signTransactionByLedger';

const {
  utils: {
      format: { parseNearAmount },
  },
} = nearApiJs;

// set this to the same value as we use for creating an account and the remainder is refunded
const FT_TRANSFER_GAS = parseNearAmount('0.00000000003');
console.log("FT_TRANSFER_GAS",FT_TRANSFER_GAS)

// contract might require an attached depositof of at least 1 yoctoNear on transfer methods
// "This 1 yoctoNEAR is not enforced by this standard, but is encouraged to do. While ability to receive attached deposit is enforced by this token."
// from: https://github.com/near/NEPs/issues/141
const FT_TRANSFER_DEPOSIT = '1';

const addTransferNearRequest = (contract, withApprove, recipientId, amount) => {
  const method = withApprove ? 'add_request_and_confirm' : 'add_request';

  return contract[method]({
    args: {
      request: {
        receiver_id: recipientId,
        actions: [{ type: 'Transfer', amount: parseNearAmount(amount) }],
      },
    },
  });
};

const addTransferRequest = async (contract, withApprove, recipientId, amount, contractName) => {
  const method = withApprove ? 'add_request_and_confirm' : 'add_request';
  const args = Buffer.from(`{"amount": ${amount}, "memo": ${undefined}, "receiver_id": ${recipientId}]}`)
    .toString('base64')
  return contract[method]({
    args: {
      request: {
        receiver_id: contractName,
        actions: [{
          type: 'FunctionCall',
          method_name: 'ft_transfer',
          args,
          deposit: FT_TRANSFER_DEPOSIT,
          gas: FT_TRANSFER_GAS,
        }],
      },
    },
  });
};

const signTxByLedger = async (
  contract,
  withApprove,
  recipientId,
  amount,
  multisafeId,
  state,
  actions,
) => {
  await signTransactionByLedger({
    actionName: 'Transfer',
    state,
    actions,
    contractMethod: () => addTransferRequest(contract, withApprove, recipientId, amount),
    callback: async () => {
      // Here we load data to update UI according to the last changes
      // TODO move onMountDashboard functions into helper - it can mislead devs in the future
      await actions.multisafe.onMountDashboard(multisafeId);
    },
  });
};

export const onTransferTokens = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  const { onClose, contractName } = payload;
  const { recipientId, amount, withApprove } = payload.data;

  const state = getStoreState();
  const isNearWallet = state.general.selectors.isNearWallet;
  const contract = state.multisafe.entities.contract;
  const multisafeId = state.multisafe.general.multisafeId;
  const actions = getStoreActions();

  const isNearContract = !contractName;
  // contract is assumed to be 'near' if alternate contract name is not given
  if (isNearContract) {
    isNearWallet
      ? addTransferNearRequest(contract, withApprove, recipientId, amount)
      : await signTxByLedger(contract, withApprove, recipientId, amount, multisafeId, state, actions);
  }
  else {
    isNearWallet
      && addTransferRequest(contract, withApprove, recipientId, amount, contractName)
      // to do:
      // : await signTxByLedger(contract, withApprove, recipientId, amount, multisafeId, state, actions);
  }
  onClose();
});
