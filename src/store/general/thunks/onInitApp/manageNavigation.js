import { matchPath } from 'react-router';

import { routes, getRoute } from '../../../../ui/config/routes';

const { root, welcome, getStarted, createMultisafe, loadMultisafe, dashboard, history, members, safeEdit } =
  routes;

/** Anon user without data:
 * * root / createMultisafe / dashboard / history / members -> welcome;
 * * getStarted / welcome / loadMultisafe -> no changes;
 *
 * Anon user with data:
 * * root / welcome / getStarted / createMultisafe -> dashboard;
 * * dashboard / history / members / loadMultisafe -> no changes;
 *
 * Connected user without data:
 * * root / welcome / dashboard / history / members -> dashboard;
 * * getStarted / createMultisafe / loadMultisafe -> no changes;
 *
 * Connected user with data:
 * * root / welcome / getStarted -> dashboard;
 * * dashboard / history / members / createMultisafe / loadMultisafe -> no changes;
 */
export const manageNavigation = (state, browserHistory) => {
    const isConnected = state.general.user.isConnected;
    const hasSavedMultisafes = state.general.selectors.hasSavedMultisafes;
    const lastActiveMultisafeId = state.multisafe.general.multisafeId;

    const match = matchPath(browserHistory.location.pathname, {
        path: [root, welcome, getStarted, createMultisafe, loadMultisafe, dashboard, history, members, safeEdit],
        exact: true,
    });
    if (!match) return;

    const ifInclude = (_routes) => _routes.includes(match.path);
    // Anon user without data
    if (
        !isConnected &&
    !hasSavedMultisafes &&
    ifInclude([root, createMultisafe, dashboard, history, members, safeEdit])
    ) {
        browserHistory.replace(welcome);
    }

    // Anon user with data
    if (
        !isConnected &&
    hasSavedMultisafes &&
    ifInclude([root, welcome, getStarted, createMultisafe])
    ) {
        browserHistory.replace(getRoute.dashboard(lastActiveMultisafeId));
    }

    // Connected user without data
    if (
        isConnected &&
    !hasSavedMultisafes &&
    ifInclude([root, welcome, dashboard, history, members])
    ) {
        browserHistory.replace(getStarted);
    }

    // Connected user with data
    if (isConnected && hasSavedMultisafes && ifInclude([root, welcome, getStarted])) {
        browserHistory.replace(getRoute.dashboard(lastActiveMultisafeId));
    }
};
