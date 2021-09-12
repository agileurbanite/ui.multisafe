import { thunk } from 'easy-peasy';
import { redirectActions } from '../../../config/redirectActions';
import { getRoute } from '../../../ui/config/routes';

export const onConnectNearWallet = thunk(async (_, history, { getStoreState, getStoreActions }) => {
  const state = getStoreState();
  const wallet = state.general.entities.wallet;

  const actions = getStoreActions();
  const setTemporaryData = actions.general.setTemporaryData;

  const redirectAction = redirectActions.connectNearWallet;

  setTemporaryData({
    redirectAction,
    origin: history.location.pathname,
  });

  await wallet.requestSignIn({
    successUrl: getRoute.callbackUrl({ redirectAction }),
    failureUrl: getRoute.callbackUrl({ redirectAction, errorCode: true }),
  });
});
