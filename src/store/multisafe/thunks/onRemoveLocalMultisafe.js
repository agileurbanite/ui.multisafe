import { thunk } from 'easy-peasy';

import { getRoute, routes } from '../../../ui/config/routes';

export const onRemoveLocalMultisafe = thunk(
    async (_, payload, { getStoreState, getStoreActions }) => {
        const { history, multisafeId } = payload;

        const actions = getStoreActions();
        const removeMultisafe = actions.multisafe.removeMultisafe;

        removeMultisafe(multisafeId);

        const state = getStoreState();
        const membership = state.multisafe.selectors.multisafes.membership;
        const readOnly = state.multisafe.selectors.multisafes.readOnly;

        if (membership.length > 0) {
            history.push(getRoute.dashboard(membership[0].multisafeId));
            return;
        }

        if (readOnly.length > 0) {
            history.push(getRoute.dashboard(readOnly[0].multisafeId));
            return;
        }

        history.push(routes.getStarted);
    },
);
