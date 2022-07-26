import { routes } from '@ui/config/routes';
import { thunk } from 'easy-peasy';

import { getNearEntities } from './helpers/getNearEntities';

export const onDisconnect = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
    const { history } = payload;

    const actions = getStoreActions();
    const resetState = actions.resetState;
    const initApp = actions.general.initApp;

    localStorage.clear();
    resetState();

    history.push(routes.welcome);

    const nearEntities = await getNearEntities(getStoreState);

    initApp({ nearEntities });
});
