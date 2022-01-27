import { matchPath } from 'react-router';
import { routes } from '../../../../ui/config/routes';

const { createMultisafe, dashboard, history, members, redirectFromWallet } = routes;

export const getDataBeforeRenderPage = async ({
  actions,
  history: browserHistory,
  withLoading,
}) => {
  console.log('aloha0')
  const enableLoading = actions.general.enableLoading;
  const disableLoading = actions.general.disableLoading;
  const onMountMultisafe = actions.multisafe.onMountMultisafe;
  const onMountDashboard = actions.multisafe.onMountDashboard;
  const onMountHistory = actions.multisafe.onMountHistory;

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

  console.log('aloha in getDataBeforerenderPage')

  if (ifRouteIs(dashboard) || ifRouteIs(redirectFromWallet)) {
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
