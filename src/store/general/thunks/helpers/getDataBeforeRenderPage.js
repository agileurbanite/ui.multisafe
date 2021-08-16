import { matchPath } from 'react-router';
import { routes } from '../../../../ui/config/routes';

const { createMultisafe, dashboard, history, members } = routes;

export const getDataBeforeRenderPage = async (actions, browserHistory, withLoading) => {
  const enableLoading = actions.general.enableLoading;
  const disableLoading = actions.general.disableLoading;
  const onMountMultisafe = actions.multisafe.onMountMultisafe;
  const onMountDashboard = actions.multisafe.onMountDashboard;
  const onMountHistory = actions.multisafe.onMountHistory;
  const onMountCreateMultisafe = actions.startWork.onMountCreateMultisafe;

  const match = matchPath(browserHistory.location.pathname, [
    createMultisafe,
    dashboard,
    history,
    members,
  ]);
  if (!match) return;

  withLoading && enableLoading();
  const { path } = match;
  const { multisafeId } = match?.params;
  const ifRouteIs = (route) => route === path;

  if (ifRouteIs(createMultisafe)) {
    await onMountCreateMultisafe();
  }

  // TODO maybe we can unite these 2 thunks into one
  if (ifRouteIs(dashboard)) {
    await onMountMultisafe({ multisafeId });
    await onMountDashboard();
  }

  if (ifRouteIs(history)) {
    await onMountMultisafe({ multisafeId });
    await onMountHistory();
  }

  if (ifRouteIs(members)) {
    await onMountMultisafe({ multisafeId });
  }

  withLoading && disableLoading();
};
