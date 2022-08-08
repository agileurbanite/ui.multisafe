import { routes } from '@ui//config/routes';
import { matchPath } from 'react-router';

const { welcome, getStarted } = routes;

const getDestination = (origin) => {
    const match = matchPath(origin, { path: [welcome], exact: true });
    if (match?.path === welcome) return getStarted;
    return origin;
};

const onSuccess = (state, actions, browserHistory, query) => {
    const destination = getDestination(state.general.temporary.origin);

    actions.general.setUserData({
        accountId: query.account_id,
        isConnected: true,
        walletType: 'my-near-wallet',
        publicKey: null,
    });

    browserHistory.replace(destination);
};

const onError = (state, actions, browserHistory) => {
    actions.general.setError({
        isError: true,
        description: 'You have not connected your wallet',
    });

    browserHistory.replace(state.general.temporary.origin);
};

export const connectNearWallet = async ({ state, actions, history: browserHistory, query }) => {
    actions.general.deleteTemporaryData();
    if (query.account_id) onSuccess(state, actions, browserHistory, query);
    if (query.errorCode) onError(state, actions, browserHistory);
};
