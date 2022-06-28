import { thunk } from 'easy-peasy';

import { redirectActions } from '../../../config/redirectActions';
import { config } from '../../../near/config';
import { getRoute } from '../../../ui/config/routes';
import { signTransactionByLedger } from '../helpers/signTransactionByLedger';

const ATTACHED_GAS = config.gas.default;

const prepareRequestArgs = ({
    receiver_id,
    actions,
    gas,
    callbackUrl
}) => ({
    args: {
        request: {
            receiver_id,
            actions,
        },
    },
    gas,
    callbackUrl
});

const serializeData = ({ name, members, num_confirmations }) => ({
    name,
    numConfirmations: Number(num_confirmations),
    members: members.map(({ account_id }) => ({ account_id })),
});

const addEditRequest = (contract, contractActions, callbackUrl) => {
    const method = 'add_request_and_confirm';

    const args = prepareRequestArgs({
        receiver_id: contract.contractId,
        actions: contractActions,
        gas: ATTACHED_GAS,
        callbackUrl
    });

    return contract[method](args);
};

const generateConfirmationsActions = (values, numConfirmations) => values.numConfirmations !== numConfirmations
    ? [{ type: 'SetNumConfirmations', num_confirmations: values.numConfirmations }]
    : [];

const generateMembersActions = (values, currentMembers) => {
    const currentMembersIds = currentMembers.map(({ accountId }) => accountId);
    const membersIds = values.members?.map(({ account_id }) => account_id) || [];

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
        : [];

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
        : [];

    return [
        ...addMembersActions,
        ...deleteMembersActions
    ];
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

const signBatchTxByLedger = async (contract, confirmationsActions, membersActions, actions, multisafeId, state, history) => {
    await signTransactionByLedger({
        actionName: 'Edit Multi Safe',
        state,
        actions,
        contractMethod: () => addEditRequest(contract, membersActions)
    });

    await signTransactionByLedger({
        actionName: 'Edit Multi Safe',
        state,
        actions,
        contractMethod: () => addEditRequest(contract, confirmationsActions),
        callback: async () => {
            await actions.multisafe.onMountDashboard(multisafeId);
            history.push(getRoute.dashboard(multisafeId));
        },
    });
};

const prepareBatchRequest = (contract, confirmationsActions, membersActions, actions) => {
    const method = 'add_request_and_confirm';

    actions.general.setTemporaryData({
        redirectAction: redirectActions.batchRequest,
        multisafeId: contract.contractId,
        batchRequest: {
            args: prepareRequestArgs({
                receiver_id: contract.contractId,
                actions: confirmationsActions,
                gas: ATTACHED_GAS,
                callbackUrl: `${window.location.origin}${getRoute.dashboard(contract.contractId)}`
            }),
            method
        },
    });

    const callbackUrl = getRoute.callbackUrl({ redirectAction: redirectActions.batchRequest });
    addEditRequest(contract, membersActions, callbackUrl);
};

export const onEditMultisafe = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
    const { data, history } = payload;

    const state = getStoreState();
    const actions = getStoreActions();
    const values = serializeData(data);
  
    const isNearWallet = state.general.selectors.isNearWallet;
    const contract = state.multisafe.entities.contract;
    const members = state.multisafe.members;
    const name = state.multisafe.general.name;
    const numConfirmations = state.multisafe.general.numConfirmations;
    const multisafeId = state.multisafe.general.multisafeId;

    const membersActions = generateMembersActions(values, members);
    const confirmationsActions = generateConfirmationsActions(values, numConfirmations);

    const nameChanged = values.name !== name;
    const membersChanged = !!membersActions.length;
    const confirmationsChanged = !!confirmationsActions.length;
    const nothingChanged = !nameChanged && !membersChanged && !confirmationsChanged;
    const onlyNameChanged = nameChanged && !membersChanged && !confirmationsChanged;
    const isBatchedRequest = membersChanged && confirmationsChanged;

    if (nothingChanged) {
        return;
    }

    if (nameChanged) {
        actions.multisafe.changeMultisafeName({ multisafeId, data });
    }

    if (onlyNameChanged) {
        history.push(getRoute.dashboard(multisafeId));
        return;
    }

    if (isBatchedRequest) {
        isNearWallet
            ? prepareBatchRequest(contract, confirmationsActions, membersActions, actions)
            : await signBatchTxByLedger(contract, confirmationsActions, membersActions, actions, multisafeId, state, history);
        return;
    } 

    // single request
    const contractActions = [
        ...confirmationsActions,
        ...membersActions
    ];
    const callbackUrl = `${window.location.origin}${getRoute.dashboard(contract.contractId)}`;

    isNearWallet
        ? addEditRequest(contract, contractActions, callbackUrl)
        : await signTxByLedger(contract, contractActions, actions, multisafeId, state, history);
});
