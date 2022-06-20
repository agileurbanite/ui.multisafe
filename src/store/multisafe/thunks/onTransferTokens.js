import * as nearApiJs from 'near-api-js';
import { thunk } from 'easy-peasy';
import BN from 'bn.js';
import { signTransactionByLedger } from '../helpers/signTransactionByLedger';
import FungibleTokens from '../../../services/FungibleTokens';
import { parseOtherAmount } from '../../../utils/format';

const ATTACHED_GAS = new BN('100000000000000');

const {
  utils: {
      format: { parseNearAmount },
  },
} = nearApiJs;

const addTransferNearRequest = ({ contract, withApprove, recipientId, amount }) => {
  const method = withApprove ? 'add_request_and_confirm' : 'add_request';

  return contract[method]({
    args: {
      request: {
        receiver_id: recipientId,
        actions: [{ type: 'Transfer', amount: parseNearAmount(amount) }],
      },
      gas: ATTACHED_GAS,
    },
  });
};

const signNearTxByLedger = async ({
  contract,
  withApprove,
  recipientId,
  amount,
  multisafeId,
  state,
  actions,
}) => {
  await signTransactionByLedger({
    actionName: 'Transfer',
    state,
    actions,
    contractMethod: () => addTransferNearRequest({ contract, withApprove, recipientId, amount }),
    callback: async () => {
      await actions.multisafe.onMountDashboard(multisafeId);
    },
  });
};

const signTxByLedger = async ({
  fungibleTokensService,
  contract,
  withApprove,
  recipientId,
  amount,
  contractName,
  multisafeId,
  state,
  actions,
}) => {
  await signTransactionByLedger({
    actionName: 'Transfer',
    state,
    actions,
    contractMethod: () => fungibleTokensService.addTransferRequest({ multisafeContract: contract, withApprove, recipientId, amount, contractName }),
    callback: async () => {
      await actions.multisafe.onMountDashboard(multisafeId);
    },
  });
};

export const onTransferTokens = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  const { onClose, token } = payload;
  const { recipientId, amount, withApprove } = payload.data;

  const state = getStoreState();
  const isNearWallet = state.general.selectors.isNearWallet;
  const near = state.general.entities.near;
  const contract = state.multisafe.entities.contract;
  const multisafeId = state.multisafe.general.multisafeId;
  const actions = getStoreActions();
  const fungibleTokensService = new FungibleTokens(near.connection);

  const isNearTransaction = !token;
  // token is assumed to be NEAR if alternate token is not given
  if (isNearTransaction) {
    isNearWallet
      ? addTransferNearRequest({ contract, withApprove, recipientId, amount })
      : await signNearTxByLedger({ contract, withApprove, recipientId, amount, multisafeId, state, actions });
  }
  else {
    isNearWallet
      ? await fungibleTokensService.addTransferRequest({ 
        multisafeContract: contract,
        withApprove,
        recipientId,
        amount: parseOtherAmount(token, amount),
        contractName: token.contractName 
      })
      : await signTxByLedger({ 
        fungibleTokensService,
        contract,
        withApprove,
        recipientId,
        amount: parseOtherAmount(token, amount),
        multisafeId,
        state,
        actions,
        contractName: token.contractName 
      });
  }

  onClose();
});
