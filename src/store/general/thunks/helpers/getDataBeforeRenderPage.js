import { routes } from '../../../../ui/config/routes';

const { dashboard, history, members } = routes;

export const getDataBeforeRenderPage = async ({
  actions,
  withLoading,
  match
}) => {
  const enableLoading = actions.general.enableLoading;
  const disableLoading = actions.general.disableLoading;
  const onMountMultisafe = actions.multisafe.onMountMultisafe;
  const onMountDashboard = actions.multisafe.onMountDashboard;
  const onMountHistory = actions.multisafe.onMountHistory;

  if (!match) return;

  const { multisafeId } = match?.params;
  const ifRouteIs = (route) => route === match.path;

  withLoading && enableLoading();

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
