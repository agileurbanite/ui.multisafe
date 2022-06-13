import { thunk } from 'easy-peasy';
import { utils } from 'near-api-js';
import { spaceToSnake } from '../../../utils/format';
import { signTransactionByLedger } from '../../multisafe/helpers/signTransactionByLedger';
import { getMultisafeFactoryContract } from '../helpers/getMultisafeFactoryContract';
import { config } from '../../../near/config';
import { redirectActions } from '../../../config/redirectActions';
import { getRoute } from '../../../ui/config/routes';

// TEN PLIK PRZENIESC do multisafe/thunks

const serializeData = ({ name, multisafeId, members, num_confirmations, amount }) => ({
  numConfirmations: Number(num_confirmations),
});

const createMultisafe = (contract, values) => {
  const { multisafeId, members, numConfirmations, amount } = values;

  return contract.create({
    args: {
      name: multisafeId,
      members,
      num_confirmations: numConfirmations,
    },
    gas: config.maxGas,
    amount,
    callbackUrl: getRoute.callbackUrl({ redirectAction: redirectActions.createMultisafe }),
  });
};

const signByNearWallet = (contract, values, actions, currentMembers, numConfirmations) => {
//   actions.general.setTemporaryData({
//     redirectAction: redirectActions.createMultisafe,
//     name: values.name,
//     multisafeId: values.multisafeAccountId,
//   });

//   createMultisafe(contract, values);

  const currentMembersIds = currentMembers.map(({ accountId }) => accountId)
  const membersIds = values.members?.map(({ account_id }) => account_id) || []
  const method = 'add_request_and_confirm';

  const addMembersActions = membersIds.length
    ? values.members.reduce((x, member) => [
      ...x,
      ...(!currentMembersIds.includes(member.account_id) ? [{
          type: 'AddMember',
          member: {
              account_id: member.account_id
          }
      }] : [])
    ], [])
    : []


  const deleteMembersActions = membersIds.length
    ? currentMembers.reduce((x, currentMember) => [
      ...x,
      ...(!membersIds.includes(currentMember.accountId) ? [{
          type: 'DeleteMember',
          member: {
              account_id: currentMember.accountId
          }
      }] : [])
    ], [])
    : []

  const changeConfirmations = values.numConfirmations
    ? [{ type: 'SetNumConfirmations', num_confirmations: values.numConfirmations }]
    : []

  const args = {
    args: {
      request: {
        receiver_id: contract.contractId,
        actions: [
            ...changeConfirmations,
            ...addMembersActions,
            ...deleteMembersActions
        ],
      },
    },
  }

  return contract[method](args);
};

const signTxByLedger = async (contract, values, state, actions, history) => {
  await signTransactionByLedger({
    actionName: 'Create Multi Safe',
    state,
    actions,
    contractMethod: () => createMultisafe(contract, values),
    callback: () => {
      actions.multisafe.addMultisafe({
        name: values.name,
        multisafeId: values.multisafeAccountId,
      });
      history.push(getRoute.dashboard(values.multisafeAccountId));
    },
  });
};

export const onEditMultisafe = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  // TESTOWAC DLA KILKU MULTISAFOW NA RAZ, jak jest kilka dodanych czy to dalej dziala poprawnie
  const { data, history } = payload;
  const state = getStoreState();
  const isNearWallet = state.general.selectors.isNearWallet;

  const actions = getStoreActions();
  const factoryContract = getMultisafeFactoryContract(state);
  const values = serializeData(data);

  const contract = state.multisafe.entities.contract;
  const members = state.multisafe.members;
  const numConfirmations = state.multisafe.general.numConfirmations;

  isNearWallet
    ? signByNearWallet(contract, values, actions, members, numConfirmations)
    : await signTxByLedger(factoryContract, values, state, actions, history);
});
