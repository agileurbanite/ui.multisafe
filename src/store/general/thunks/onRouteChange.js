import { thunk } from 'easy-peasy';
import { matchPath } from 'react-router';
import { routes } from '../../../ui/config/routes';

const { createMultisafe, dashboard, members } = routes;

export const onRouteChange = thunk(async (_, payload, { getStoreActions }) => {
  const { history, withLoading = true } = payload;
  const actions = getStoreActions();
  const enableLoading = actions.general.enableLoading;
  const disableLoading = actions.general.disableLoading;
  const onMountMultisafe = actions.multisafe.onMountMultisafe;
  const onMountDashboard = actions.multisafe.onMountDashboard;
  const onMountCreateMultisafe = actions.startWork.onMountCreateMultisafe;

  const res = matchPath(history.location.pathname, [createMultisafe, dashboard, members]);
  if (res === null) return;

  withLoading && enableLoading();
  const { path, params } = res;
  const ifRouteIs = (route) => route === path;

  ifRouteIs(createMultisafe) && (await onMountCreateMultisafe());

  if (ifRouteIs(dashboard)) {
    const { multisafeId } = params;
    // TODO we can unite those 2 thunks into one
    await onMountMultisafe({ multisafeId });
    await onMountDashboard();
  }

  if (ifRouteIs(members)) {
    const { multisafeId } = params;
    await onMountMultisafe({ multisafeId });
  }

  withLoading && disableLoading();
});
