import * as nearApiJs from 'near-api-js';
import { thunk } from 'easy-peasy';
import { signTransactionByLedger } from '../helpers/signTransactionByLedger';
import FungibleTokens from '../../../services/FungibleTokens';
import { parseOtherAmount } from '../../../utils/format';

const {
  utils: {
      format: { parseNearAmount },
  },
} = nearApiJs;

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
    contractMethod: () => addTransferNearRequest(contract, withApprove, recipientId, amount),
    callback: async () => {
      // Here we load data to update UI according to the last changes
      // TODO move onMountDashboard functions into helper - it can mislead devs in the future
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
  const mountTokenList = actions.multisafe.mountTokenList;
  const fungibleTokensService = new FungibleTokens(near.connection);

  const isNearTransaction = !token;
  // token is assumed to be 'near' if alternate token is not given
  if (isNearTransaction) {
    isNearWallet
      ? addTransferNearRequest(contract, withApprove, recipientId, amount)
      : await signTxByLedger(contract, withApprove, recipientId, amount, multisafeId, state, actions);
  }
  else {
    isNearWallet
      && await fungibleTokensService.addTransferRequest({multisafeContract: contract, withApprove, recipientId, amount: parseOtherAmount(token, amount), contractName: token.contractName})
      // to do:
      // : await signTxByLedger(fungibleTokensService, contract, withApprove, recipientId, amount, multisafeId, state, actions, contractName);
  }

  const fungibleTokens = state.multisafe.general.fungibleTokens;

  const updatedTokens = await Promise.all(await fungibleTokens.map(async ({contractName}) => {
    const tokenMetadata = await contract.account.viewFunction(
      contractName,
      'ft_metadata'
    );
    const tokenBalance = await contract.account.viewFunction(
      contractName,
      'ft_balance_of',
      { account_id: multisafeId }
    );
    return { ...tokenMetadata, tokenBalance, contractName };
  }));
  mountTokenList({
    fungibleTokens: updatedTokens
  });
  onClose();
});
