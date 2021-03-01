import { thunk } from 'easy-peasy';
import { matchPath } from 'react-router';
import { routes } from '../../ui/config/routes';

const { createMultisafe, dashboard } = routes;

export const onRouteChange = thunk(async (actions, payload) => {
  const { enableLoading, disableLoading } = actions.general;
  const { history } = payload;

  const res = matchPath(history.location.pathname, [createMultisafe, dashboard]);
  if (res === null) return;

  enableLoading();
  const { path, params } = res;

  if (path === routes.dashboard)
    await actions.multisafe.onLoadMultisafePanel({ multisafeId: params.id });

  disableLoading();
});
