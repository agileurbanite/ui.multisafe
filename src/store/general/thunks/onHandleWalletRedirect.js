import { thunk } from 'easy-peasy';
import { matchPath } from 'react-router';
import qs from 'query-string';
import { routes as routesConfig, getRoute } from '../../../ui/config/routes';

const { welcome, createMultisafe } = routesConfig;

const handleCreateMultisafe = (actions, { name, multisafeId, errorCode }, replace) => {
  if (errorCode) {
    actions.general.setError({
      isError: true,
      description: 'The multisafe was not created. Please try again',
    });
    return;
  }
  actions.multisafe.addMultisafe({ data: { name, multisafeId } });
  replace(getRoute.dashboard(multisafeId));
};

export const onHandleWalletRedirect = thunk(async (_, payload, { getStoreActions }) => {
  const { replace } = payload.history;
  const { search, pathname } = payload.history.location;
  const actions = getStoreActions();

  // If we don't have any query param just skip this function
  if (search === '') return;
  const queryParams = qs.parse(search);
  const { errorCode } = queryParams;
  // We want to remove all query params from url and keep it clean
  replace(pathname);

  const match = matchPath(pathname, {
    path: [createMultisafe, welcome],
    exact: true,
  });

  const ifRouteIs = (route) => route === match?.path;

  // Handle error after call onConnectToWallet
  if (ifRouteIs(welcome) && errorCode) {
    actions.general.setError({
      isError: true,
      description: 'You have not connected your wallet',
    });
    return;
  }

  // Handle error after call onCreateMultisafe
  if (ifRouteIs(createMultisafe)) {
    handleCreateMultisafe(actions, queryParams, replace);
    return;
  }

  if (errorCode) {
    actions.general.setError({
      isError: true,
      description: 'Your transaction was not completed. Please try again',
    });
  }
});
