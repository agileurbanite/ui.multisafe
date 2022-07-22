import { thunk } from 'easy-peasy';

import { routes } from '../../../ui/config/routes';

export const onDisconnect = thunk(async (_, payload, { getStoreActions }) => {
    const { history, selector } = payload;

    const actions = getStoreActions();
    const resetState = actions.resetState;

    localStorage.clear();
    resetState();

    if (selector && selector.isSignedIn()) {
        const wallet = await selector.wallet();
        await wallet?.signOut();
    }
    history?.replace(routes.welcome);
});
