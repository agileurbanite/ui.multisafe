import { matchPath } from 'react-router';
import { routes, getRoute } from '../../config/routes';

const { root, welcome, getStarted, createMultisafe, loadMultisafe, dashboard, members } = routes;

/** Anon user without data:
 * * root / createMultisafe / dashboard / members -> welcome;
 * * getStarted / welcome / loadMultisafe -> no changes;
 *
 * Anon user with data:
 * * root / welcome / getStarted / createMultisafe -> dashboard;
 * * dashboard / members / loadMultisafe -> no changes;
 *
 * Connected user with data:
 * * root / welcome / getStarted -> dashboard;
 * * dashboard / members / createMultisafe / loadMultisafe -> no changes;
 */
export const setInitRoute = (history, _store) => {
  const store = _store.getState();
  const isConnected = store.general.user.isConnected;
  const hasSavedMultisafes = store.general.selectors.hasSavedMultisafes;
  const lastActiveMultisafeId = store.multisafe.general.multisafeId;

  const { replace } = history;

  const match = matchPath(history.location.pathname, {
    path: [root, welcome, getStarted, createMultisafe, loadMultisafe, dashboard, members],
    exact: true,
  });
  if (!match) return;
  const ifInclude = (_routes) => _routes.includes(match.path);

  // Anon user without data
  if (
    !isConnected &&
    !hasSavedMultisafes &&
    ifInclude([root, createMultisafe, dashboard, members])
  ) {
    replace(welcome);
  }

  // Anon user with data
  if (
    !isConnected &&
    hasSavedMultisafes &&
    ifInclude([root, welcome, getStarted, createMultisafe])
  ) {
    replace(getRoute.dashboard(lastActiveMultisafeId));
  }

  // Connected user with data
  if (isConnected && hasSavedMultisafes && ifInclude([root, welcome, getStarted])) {
    replace(getRoute.dashboard(lastActiveMultisafeId));
  }
};
