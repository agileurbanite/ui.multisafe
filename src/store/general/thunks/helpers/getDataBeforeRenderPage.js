import { matchPath } from 'react-router';
import { routes } from '../../../../ui/config/routes';

const { createMultisafe, dashboard, history, members } = routes;

export const getDataBeforeRenderPage = async ({
  actions,
  history: browserHistory,
  withLoading,
}) => {
  const enableLoading = actions.general.enableLoading;
  const disableLoading = actions.general.disableLoading;
  const onMountMultisafe = actions.multisafe.onMountMultisafe;
  const onMountDashboard = actions.multisafe.onMountDashboard;
  const onMountHistory = actions.multisafe.onMountHistory;
  const onMountTokenList = actions.multisafe.onMountTokenList;

  const match = matchPath(browserHistory.location.pathname, [
    createMultisafe,
    dashboard,
    history,
    members,
  ]);

  if (!match) return;

  const { multisafeId } = match?.params;
  const ifRouteIs = (route) => route === match.path;

  withLoading && enableLoading();

  if ([dashboard, history, members].includes(match.path)) {
    await onMountTokenList(multisafeId);
  }

  if (ifRouteIs(dashboard)) {
    // await onMountMultisafe({ multisafeId });
    await onMountDashboard(multisafeId);
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
