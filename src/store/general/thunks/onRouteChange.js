import { thunk } from 'easy-peasy';
import { matchPath } from 'react-router';
import { routes } from '../../../ui/config/routes';

const { createMultisafe, dashboard } = routes;

export const onRouteChange = thunk(async (actions, payload, { getStoreActions }) => {
  const storeActions = getStoreActions();
  const { enableLoading, disableLoading } = actions;
  const { onMountMultisafe } = storeActions.multisafe;
  const { onMountCreateMultisafe } = storeActions.startWork;
  const { history, withLoading = true } = payload;

  const res = matchPath(history.location.pathname, [createMultisafe, dashboard]);
  if (res === null) return;

  withLoading && enableLoading();
  const { path, params } = res;
  const ifRouteIs = (route) => route === path;

  ifRouteIs(createMultisafe) && (await onMountCreateMultisafe());
  ifRouteIs(dashboard) && (await onMountMultisafe({ multisafeId: params.multisafeId }));

  withLoading && disableLoading();
});
