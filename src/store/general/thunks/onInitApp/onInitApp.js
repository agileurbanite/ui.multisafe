import { thunk } from 'easy-peasy';
import { matchPath } from 'react-router';
import { routes } from '../../../../ui/config/routes';
import { getDataBeforeRenderPage } from '../helpers/getDataBeforeRenderPage';
import { getNearEntities } from '../helpers/getNearEntities';
import { isRedirect } from './isRedirect';
import { manageNavigation } from './manageNavigation';
import { handleRedirectFromWallet } from './handleRedirectFromWallet/handleRedirectFromWallet';

const { createMultisafe, dashboard, history: multisafeHistory, members } = routes;

export const onInitApp = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  const { history, setInit } = payload;

  const actions = getStoreActions();
  const initApp = actions.general.initApp;
  const onMountTokenList = actions.multisafe.onMountTokenList;

  const nearEntities = await getNearEntities(getStoreState);

  initApp({ nearEntities });

  const state = getStoreState();

  // All redirect from NEAR Wallet leads to /redirect-from-wallet route. If it is the case,
  // handle it and redirect the user to the appropriate page. If not - check if a user has access
  // to the page and redirect to the proper page
  if (isRedirect(state, history)) {
    await handleRedirectFromWallet(state, actions, history);
  } else {
    manageNavigation(state, history);
  }

  const match = matchPath(history.location.pathname, [
    createMultisafe,
    dashboard,
    multisafeHistory,
    members,
  ]);
  
  const { multisafeId } = match?.params;

  // Call onMount thunk for the page - we want to load data before the page will be mounted -
  // it allows us to avoid "screen blinking" or display the empty page to the user.
  await getDataBeforeRenderPage({ actions, history, withLoading: false, match });

  // fetch fungible tokens once, subsequent fetches will be triggered via user action
  await onMountTokenList(multisafeId);

  // Finish initialization and hide loader
  setInit(true);
});
