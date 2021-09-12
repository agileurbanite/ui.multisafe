import { thunk } from 'easy-peasy';
import { utils } from 'near-api-js';
import qs from 'query-string';
import { spaceToSnake } from '../../../utils/format';
import { signTransactionByLedger } from '../../multisafe/helpers/signTransactionByLedger';
import { getMultisafeFactoryContract } from '../helpers/getMultisafeFactoryContract';
import { config } from '../../../near/config';
import { getRoute } from '../../../ui/config/routes';

// TODO Fix this - redirect to /redirects-from-wallet
const getCallbackUrl = (queryParams) => `${window.location.href}?${qs.stringify(queryParams)}`;

const createMultisafe = (contract, multisafeId, name, members, num_confirmations, gas, amount) =>
  contract.create({
    args: {
      name: multisafeId,
      members,
      num_confirmations,
    },
    gas,
    amount,
    callbackUrl: getCallbackUrl({
      name,
      multisafeId: `${multisafeId}.${config.multisafeFactoryId}`,
    }),
  });

const signTxByLedger = async (
  contract,
  multisafeId,
  name,
  members,
  num_confirmations,
  gas,
  amount,
  state,
  actions,
  history,
) => {
  await signTransactionByLedger({
    actionName: 'Create Multi Safe',
    state,
    actions,
    contractMethod: () =>
      createMultisafe(contract, multisafeId, name, members, num_confirmations, gas, amount),
    callback: async () => {
      // TODO add multisafe into store
      history.push(getRoute.dashboard(`${multisafeId}.${config.multisafeFactoryId}`));
    },
  });
};

const serializeData = ({ name, multisafeId, members, num_confirmations, amount }) => ({
  name,
  multisafeId: spaceToSnake(multisafeId),
  num_confirmations: Number(num_confirmations),
  amount: utils.format.parseNearAmount(amount),
  members: members.map(({ account_id }) => ({ account_id })),
  gas: 1e14,
});

export const onCreateMultisafe = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  const { data, history } = payload;

  const state = getStoreState();
  const isNearWallet = state.general.selectors.isNearWallet;

  const actions = getStoreActions();

  const factoryContract = getMultisafeFactoryContract(state);
  const { name, multisafeId, members, num_confirmations, amount, gas } = serializeData(data);

  isNearWallet
    ? createMultisafe(factoryContract, multisafeId, name, members, num_confirmations, gas, amount)
    : await signTxByLedger(
        factoryContract,
        multisafeId,
        name,
        members,
        num_confirmations,
        gas,
        amount,
        state,
        actions,
        history,
      );
});
