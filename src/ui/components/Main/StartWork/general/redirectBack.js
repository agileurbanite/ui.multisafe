import { getRoute, routes } from '@ui/config/routes';

export const redirectBack = (hasSavedMultisafes, multisafeId, push) => {
    const url = hasSavedMultisafes ? getRoute.dashboard(multisafeId) : routes.getStarted;
    push(url);
};
