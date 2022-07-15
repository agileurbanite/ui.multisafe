import { thunk } from 'easy-peasy';

import { routes } from '../../../ui/config/routes';

export const onDisconnect = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
    const { history, selector } = payload;

    const actions = getStoreActions();
    const resetState = actions.resetState;

    if (selector && selector.isSignedIn()) {
        const wallet = await selector.wallet();
        await wallet?.signOut();
    }

    localStorage.clear();
    resetState();
    history.replace(routes.welcome);
});
