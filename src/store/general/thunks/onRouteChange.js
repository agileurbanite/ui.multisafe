import { thunk } from 'easy-peasy';
import { matchPath } from 'react-router';
import { routes } from '../../../ui/config/routes';

const { createMultisafe, dashboard } = routes;

export const onRouteChange = thunk(async (_, payload, { getStoreActions }) => {
  const { history, withLoading = true } = payload;
  const actions = getStoreActions();
  const enableLoading = actions.general.enableLoading;
  const disableLoading = actions.general.disableLoading;
  const onMountMultisafe = actions.multisafe.onMountMultisafe;
  const onMountCreateMultisafe = actions.startWork.onMountCreateMultisafe;

  const res = matchPath(history.location.pathname, [createMultisafe, dashboard]);
  if (res === null) return;

  withLoading && enableLoading();
  const { path, params } = res;
  const ifRouteIs = (route) => route === path;

  ifRouteIs(createMultisafe) && (await onMountCreateMultisafe());
  ifRouteIs(dashboard) && (await onMountMultisafe({ multisafeId: params.multisafeId }));

  withLoading && disableLoading();
});
