import { thunk } from 'easy-peasy';
import { connect, keyStores } from 'near-api-js';
import { ProgressiveWalletConnection } from '../../../ui/config/api-overrides/progressive-wallet-connection';

// TODO move configs to config folder
export const onInitApp = thunk(async (_, payload, { getStoreActions }) => {
  const { history } = payload;
  const actions = getStoreActions();
  const initApp = actions.general.initApp;
  const initNear = actions.general.initNear;
  const onRouteChange = actions.general.onRouteChange;

  const near = await connect({
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'http://wallet.testnet.near.org',
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  });

  const wallet = new ProgressiveWalletConnection(near, 'multisafe');

  initNear({
    near,
    wallet,
    user: {
      isConnected: wallet.isSignedIn(),
      accountId: wallet.getAccountId(),
    },
  });

  // Load data from local storage

  // Handle redirects
  if (history.location.pathname === '/') {
    history.replace('/welcome');
  }

  await onRouteChange({ history, withLoading: false });
  initApp();
});
