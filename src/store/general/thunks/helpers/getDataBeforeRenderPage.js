import { matchPath } from 'react-router';
import { routes } from '../../../../ui/config/routes';

const { createMultisafe, dashboard, members } = routes;

export const getDataBeforeRenderPage = async (actions, history, withLoading) => {
  const enableLoading = actions.general.enableLoading;
  const disableLoading = actions.general.disableLoading;
  const onMountMultisafe = actions.multisafe.onMountMultisafe;
  const onMountDashboard = actions.multisafe.onMountDashboard;
  const onMountCreateMultisafe = actions.startWork.onMountCreateMultisafe;

  const match = matchPath(history.location.pathname, [createMultisafe, dashboard, members]);
  if (!match) return;

  withLoading && enableLoading();
  const { path, params } = match;
  const ifRouteIs = (route) => route === path;

  ifRouteIs(createMultisafe) && (await onMountCreateMultisafe());

  if (ifRouteIs(dashboard)) {
    const { multisafeId } = params;
    // TODO maybe we can unite these 2 thunks into one
    await onMountMultisafe({ multisafeId });
    await onMountDashboard();
  }

  if (ifRouteIs(members)) {
    const { multisafeId } = params;
    await onMountMultisafe({ multisafeId });
  }

  withLoading && disableLoading();
};
