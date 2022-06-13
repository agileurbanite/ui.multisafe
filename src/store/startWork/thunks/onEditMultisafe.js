import { thunk } from 'easy-peasy';
import { utils } from 'near-api-js';
import { spaceToSnake } from '../../../utils/format';
import { signTransactionByLedger } from '../../multisafe/helpers/signTransactionByLedger';
import { getMultisafeFactoryContract } from '../helpers/getMultisafeFactoryContract';
import { config } from '../../../near/config';
import { redirectActions } from '../../../config/redirectActions';
import { getRoute } from '../../../ui/config/routes';

// TEN PLIK PRZENIESC do multisafe/thunks

const serializeData = ({ name, members, num_confirmations }) => ({
  name,
  numConfirmations: Number(num_confirmations),
  members: members.map(({ account_id }) => ({ account_id })),
});

const signByNearWallet = (contract, values, currentMembers, numConfirmations) => {
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

const signTxByLedger = async (contract, values, members, numConfirmations, actions, multisafeId, state, history) => {
  await signTransactionByLedger({
    actionName: 'Edit Multi Safe',
    state,
    actions,
    contractMethod: () => signByNearWallet(contract, values, actions, members, numConfirmations),
    callback: async () => {
      await actions.multisafe.onMountDashboard(multisafeId);
      history.push(getRoute.dashboard(multisafeId));
    },
  });
};

export const onEditMultisafe = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  const { data, history } = payload;
  const state = getStoreState();
  const isNearWallet = state.general.selectors.isNearWallet;

  const actions = getStoreActions();
  const values = serializeData(data);

  const contract = state.multisafe.entities.contract;
  const members = state.multisafe.members;
  const numConfirmations = state.multisafe.general.numConfirmations;
  const multisafeId = state.multisafe.general.multisafeId;

  isNearWallet
    ? signByNearWallet(contract, values, members, numConfirmations, actions)
    : await signTxByLedger(contract, values, members, numConfirmations, actions, multisafeId, state, history);
});
