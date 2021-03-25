import { thunk } from 'easy-peasy';
import { matchPath } from 'react-router';
import qs from 'query-string';
import { routes as routesConfig, getRoute } from '../../../ui/config/routes';

const { createMultisafe } = routesConfig;

const handleCreateMultisafe = (actions, { name, multisafeId, errorCode }, replace) => {
  if (errorCode) {
    actions.general.setError({ isError: true, description: 'Cant create new multisafe' });
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
  // We want to remove all query params from url and keep it clean
  replace(pathname);

  const match = matchPath(pathname, {
    path: [createMultisafe],
    exact: true,
  });

  const ifRouteIs = (route) => route === match?.path;

  if (ifRouteIs(createMultisafe)) {
    handleCreateMultisafe(actions, queryParams, replace);
    return;
  }

  if (queryParams.errorCode) {
    actions.general.setError({ isError: true, description: 'Some default wallet error' });
  }
});
