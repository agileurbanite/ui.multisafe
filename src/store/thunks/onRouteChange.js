import { thunk } from 'easy-peasy';
import { matchPath } from 'react-router';
import { routes } from '../../ui/config/routes';

const { createMultisafe, dashboard } = routes;

export const onRouteChange = thunk(async (actions, payload) => {
  const { enableLoading, disableLoading } = actions.general;
  const { onLoadMultisafePanel } = actions.multisafe;
  const { onLoadCreateMultisafe } = actions.startWork;
  const { history, withLoading = true } = payload;

  const res = matchPath(history.location.pathname, [createMultisafe, dashboard]);
  if (res === null) return;

  withLoading && enableLoading();

  const { path, params } = res;
  const ifRouteIs = (route) => route === path;

  ifRouteIs(createMultisafe) && (await onLoadCreateMultisafe());
  ifRouteIs(dashboard) && (await onLoadMultisafePanel({ multisafeId: params.id }));

  withLoading && disableLoading();
});
