import { thunk } from 'easy-peasy';
import { utils } from 'near-api-js';
import { spaceToSnake } from '../../../utils/format';
import { signTransactionByLedger } from '../../multisafe/helpers/signTransactionByLedger';
import { getMultisafeFactoryContract } from '../helpers/getMultisafeFactoryContract';
import { config } from '../../../near/config';
import { redirectActions } from '../../../config/redirectActions';
import { getRoute } from '../../../ui/config/routes';

const serializeData = ({ name, members, num_confirmations }) => ({
  name,
  numConfirmations: Number(num_confirmations),
  members: members.map(({ account_id }) => ({ account_id })),
});

const generateConfirmationsActions = (values) => values.numConfirmations
    ? [{ type: 'SetNumConfirmations', num_confirmations: values.numConfirmations }]
    : []

const generateMembersActions = (values, currentMembers) => {

  const currentMembersIds = currentMembers.map(({ accountId }) => accountId)
  const membersIds = values.members?.map(({ account_id }) => account_id) || []

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

    return [
      ...addMembersActions,
      ...deleteMembersActions
    ]
}

const addEditRequest = (contract, contractActions) => {
  const method = 'add_request_and_confirm';

  const args = {
    args: {
      request: {
        receiver_id: contract.contractId,
        actions: contractActions,
      },
    },
  }

  return contract[method](args);
};

const signTxByLedger = async (contract, contractActions, actions, multisafeId, state, history) => {
  await signTransactionByLedger({
    actionName: 'Edit Multi Safe',
    state,
    actions,
    contractMethod: () => addEditRequest(contract, contractActions),
    callback: async () => {
      await actions.multisafe.onMountDashboard(multisafeId);
      history.push(getRoute.dashboard(multisafeId));
    },
  });
};

export const onEditMultisafe = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  const { data, history } = payload;

  const state = getStoreState();
  const actions = getStoreActions();
  const values = serializeData(data);
  
  const isNearWallet = state.general.selectors.isNearWallet;
  const contract = state.multisafe.entities.contract;
  const members = state.multisafe.members;
  const numConfirmations = state.multisafe.general.numConfirmations;
  const multisafeId = state.multisafe.general.multisafeId;

  const membersActions = generateMembersActions(values, members)
  const confirmationsActions = generateConfirmationsActions(values)
  const contractActions = [
    ...confirmationsActions,
    ...membersActions
  ]

  isNearWallet
    ? addEditRequest(contract, contractActions)
    : await signTxByLedger(contract, contractActions, actions, multisafeId, state, history);
});
