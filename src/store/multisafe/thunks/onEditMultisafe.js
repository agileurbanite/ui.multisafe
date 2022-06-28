import { thunk } from 'easy-peasy';

import { redirectActions } from '../../../config/redirectActions';
import { config } from '../../../near/config';
import { getRoute } from '../../../ui/config/routes';
import { signTransactionByLedger } from '../helpers/signTransactionByLedger';

const ATTACHED_GAS = config.gas.default;

const serializeData = ({ name, members, num_confirmations }) => ({
    name,
    numConfirmations: Number(num_confirmations),
    members: members.map(({ account_id }) => ({ account_id })),
});

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

const addEditRequest = (contract, contractActions) => {
    const method = 'add_request_and_confirm';

    const args = {
        args: {
            request: {
                receiver_id: contract.contractId,
                actions: contractActions,
            },
        },
        gas: ATTACHED_GAS,
        callbackUrl: `${window.location.origin}${getRoute.dashboard(contract.contractId)}`
    };

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
    const name = state.multisafe.general.name;
    const numConfirmations = state.multisafe.general.numConfirmations;
    const multisafeId = state.multisafe.general.multisafeId;

    const membersActions = generateMembersActions(values, members);
    const confirmationsActions = generateConfirmationsActions(values, numConfirmations);

    if (
        values.numConfirmations === numConfirmations
        && !membersActions.length
        && values.name === name
    ) {
        return;
    }

    if (!!confirmationsActions.length && !!confirmationsActions.length) {
        const method = 'add_request_and_confirm';

        actions.general.setTemporaryData({
            redirectAction: redirectActions.batchRequest,
            multisafeId: multisafeId,
            batchRequest: {
                args: {
                    args: {
                        request: {
                            receiver_id: contract.contractId,
                            actions: confirmationsActions,
                        },
                    },
                    gas: ATTACHED_GAS,
                    callbackUrl: `${window.location.origin}${getRoute.dashboard(multisafeId)}`
                },
                method
            },
        });

        const args = {
            args: {
                request: {
                    receiver_id: contract.contractId,
                    actions: membersActions,
                },
            },
            gas: ATTACHED_GAS,
            callbackUrl: getRoute.callbackUrl({ redirectAction: redirectActions.batchRequest }),
        };

        return contract[method](args);

    } else {
        const contractActions = [
            ...confirmationsActions,
            ...membersActions
        ];

        isNearWallet
            ? addEditRequest(contract, contractActions)
            : await signTxByLedger(contract, contractActions, actions, multisafeId, state, history);
    }
});
