import { redirectActions } from '@config/redirectActions';
import { config } from '@near/config';
import { getRoute } from '@ui/config/routes';
import { thunk } from 'easy-peasy';

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

const addEditRequest = async (contract, contractActions, callbackUrl, signAndSendTransaction, multisafeId) => {
    const method = 'add_request_and_confirm';

    return await signAndSendTransaction({
        receiverId: multisafeId,
        actions: [{
            type: 'FunctionCall',
            params: {
                methodName: method,
                args: {
                    request: {
                        receiver_id: contract.contractId,
                        actions: contractActions,
                    },
                },
                gas: ATTACHED_GAS
            },
        }],
        callbackUrl,
    });
};

const generateConfirmationsActions = (values, numConfirmations) => values.numConfirmations !== numConfirmations
    ? [{ type: 'SetNumConfirmations', num_confirmations: values.numConfirmations }]
    : [];

const generateAddMembersActions = ({ membersIds, currentMembersIds, values }) =>
    membersIds.length
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

const generateDeleteMembersActions = ({ membersIds, currentMembers }) =>
    membersIds.length
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


const generateMembersActions = (values, currentMembers) => {
    const currentMembersIds = currentMembers.map(({ accountId }) => accountId);
    const membersIds = values.members?.map(({ account_id }) => account_id) || [];

    const addMembersActions = generateAddMembersActions({ membersIds, currentMembersIds, values });
    const deleteMembersActions = generateDeleteMembersActions({ membersIds, currentMembers });

    return [
        ...addMembersActions,
        ...deleteMembersActions
    ];
};

const signTxByLedger = async (contract, contractActions, actions, multisafeId, state, history, signAndSendTransaction) => {
    await signTransactionByLedger({
        actionName: 'Edit Multi Safe',
        state,
        actions,
        contractMethod: async () => await addEditRequest(contract, contractActions, null, signAndSendTransaction, multisafeId),
        callback: async () => {
            await actions.multisafe.onMountDashboard(multisafeId);
            history.push(getRoute.dashboard(multisafeId));
        },
    });
};

const signBatchTxByLedger = async (contract, confirmationsActions, membersActions, actions, multisafeId, state, history, values, currentMembers, signAndSendTransaction) => {
    let requestOrder = [membersActions, confirmationsActions];
    if (checkChangeOrder({ currentMembers, values })) {
        requestOrder = [confirmationsActions, membersActions];
    }

    await signTransactionByLedger({
        actionName: 'Edit Multi Safe',
        state,
        actions,
        contractMethod: async () => await addEditRequest(contract, requestOrder[0], null, signAndSendTransaction, multisafeId)
    });

    await signTransactionByLedger({
        actionName: 'Edit Multi Safe',
        state,
        actions,
        contractMethod: async () => await addEditRequest(contract, requestOrder[1], null, signAndSendTransaction, multisafeId),
        callback: async () => {
            await actions.multisafe.onMountDashboard(multisafeId);
            history.push(getRoute.dashboard(multisafeId));
        },
    });
};

// It's possible that the member will be deleting 1 member and adding 2 members at a time, 
// in this case, we don't want to change the order because the final number of confirmations might be increased and in this case, 
// we need to add and delete members first, and increase the number of confirmation second, to avoid increasing the number of the confirmations above the number of members.
// example 1:
// 1. Safe is set to 2 members and 2 confirmations.
// 2. member wants to: add 2 members, remove 1 member and increase the number of confirmations by 1
// In this case, if we increase the number of confirmations first, the contract will throw an error because it cannot set num of confirmations to 3 when the number of members is still 2.
// example 2:
// 1. safe is set to 2 members and 2 confirmations.
// 2. member wants to: remove 1 member and change num of confirmation to 1
// In this case, we need to change the num of confirmations first, because if we would like to remove the member first, the contract will throw an error as the number of members cannot be lower then num of confirmations.
const checkChangeOrder = ({ currentMembers, values, }) => {
    const currentMembersIds = currentMembers.map(({ accountId }) => accountId);
    const membersIds = values.members?.map(({ account_id }) => account_id) || [];
    const addMembersActions = generateAddMembersActions({ membersIds, currentMembersIds, values });
    const deleteMembersActions = generateDeleteMembersActions({ membersIds, currentMembers });

    return deleteMembersActions.length >= 1 && addMembersActions.length < deleteMembersActions.length;
};

const prepareBatchRequest = async (contract, confirmationsActions, membersActions, actions, values, currentMembers, signAndSendTransaction, multisafeId) => {
    const method = 'add_request_and_confirm';

    // in few cases we need to revert the order of actions
    let requestOrder = [membersActions, confirmationsActions];
    if (checkChangeOrder({ currentMembers, values })) {
        requestOrder = [confirmationsActions, membersActions];
    }

    actions.general.setTemporaryData({
        redirectAction: redirectActions.batchRequest,
        multisafeId: contract.contractId,
        batchRequest: {
            args: prepareRequestArgs({
                receiver_id: contract.contractId,
                actions: requestOrder[1],
                gas: ATTACHED_GAS,
                callbackUrl: `${window.location.origin}${getRoute.dashboard(contract.contractId)}`
            }),
            method
        },
    });

    const callbackUrl = getRoute.callbackUrl({ redirectAction: redirectActions.batchRequest });
    await addEditRequest(contract, requestOrder[0], callbackUrl, signAndSendTransaction, multisafeId);
};

export const onEditMultisafe = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
    const { data, history, selector, selectedWalletId } = payload;

    const state = getStoreState();
    const actions = getStoreActions();
    const values = serializeData(data);

    const contract = state.multisafe.entities.contract;
    const members = state.multisafe.members;
    const name = state.multisafe.general.name;
    const numConfirmations = state.multisafe.general.numConfirmations;
    const multisafeId = state.multisafe.general.multisafeId;

    const wallet = await selector.wallet();
    const signAndSendTransaction = wallet.signAndSendTransaction;

    const membersActions = generateMembersActions(values, members);
    const confirmationsActions = generateConfirmationsActions(values, numConfirmations);

    const nameChanged = values.name !== name;
    const membersChanged = !!membersActions.length;
    const confirmationsChanged = !!confirmationsActions.length;
    const nothingChanged = !nameChanged && !membersChanged && !confirmationsChanged;
    const onlyNameChanged = nameChanged && !membersChanged && !confirmationsChanged;
    const isBatchRequest = membersChanged && confirmationsChanged;

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

    if (isBatchRequest) {
        // If new wallet gets introduced, please update here
        switch (selectedWalletId) {
            case 'near-wallet':
            case 'my-near-wallet':
                await prepareBatchRequest(contract, confirmationsActions, membersActions, actions, values, members, signAndSendTransaction, multisafeId);
                break;
            case 'ledger':
                await signBatchTxByLedger(contract, confirmationsActions, membersActions, actions, multisafeId, state, history, values, members, signAndSendTransaction);
                break;

            default:
                throw Error(`Unsupported wallet selected: '${selectedWalletId}'`);
        }
        return;
    }

    // single request
    const contractActions = [
        ...confirmationsActions,
        ...membersActions
    ];
    const callbackUrl = `${window.location.origin}${getRoute.dashboard(contract.contractId)}`;

    // If new wallet gets introduced, please update here
    switch (selectedWalletId) {
        case 'near-wallet':
        case 'my-near-wallet':
            await addEditRequest(contract, contractActions, callbackUrl, signAndSendTransaction, multisafeId);
            break;
        case 'ledger':
            await signTxByLedger(contract, contractActions, actions, multisafeId, state, history, signAndSendTransaction);
            break;

        default:
            throw Error(`Unsupported wallet selected: '${selectedWalletId}'`);
    }
});

export const isBatchRequest = thunk(async (_, payload, { getStoreState }) => {
    const { data } = payload;

    const state = getStoreState();
    const values = serializeData(data);

    const members = state.multisafe.members;
    const numConfirmations = state.multisafe.general.numConfirmations;

    const membersActions = generateMembersActions(values, members);
    const confirmationsActions = generateConfirmationsActions(values, numConfirmations);

    const membersChanged = !!membersActions.length;
    const confirmationsChanged = !!confirmationsActions.length;
    const isBatchRequest = membersChanged && confirmationsChanged;

    return isBatchRequest;
});
