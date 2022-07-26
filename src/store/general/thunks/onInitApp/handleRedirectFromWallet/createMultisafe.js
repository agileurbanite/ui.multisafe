import { getRoute, routes } from '@ui/config/routes';

const onSuccess = async (state, actions, browserHistory) => {
    const { name, multisafeId } = state.general.temporary;

    actions.multisafe.addMultisafe({ name, multisafeId });
    actions.general.deleteTemporaryData();
    browserHistory.replace(getRoute.dashboard(multisafeId));
};

const onError = (state, actions, browserHistory) => {
    actions.general.setError({
        isError: true,
        description: 'Multisafe was not created',
    });
    actions.general.deleteTemporaryData();
    browserHistory.replace(routes.createMultisafe);
};

export const createMultisafe = async ({ state, actions, history: browserHistory, query }) => {
    if (query.transactionHashes) await onSuccess(state, actions, browserHistory);
    if (query.errorCode) onError(state, actions, browserHistory);
};
