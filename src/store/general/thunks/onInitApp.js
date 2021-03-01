import { thunk } from 'easy-peasy';
import { connect, keyStores, WalletConnection } from 'near-api-js';

// TODO move configs to config folder
export const onInitApp = thunk(async (actions) => {
  const { initApp, initNear } = actions;

  const near = await connect({
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'http://wallet.testnet.near.org',
    keyStore: new keyStores.BrowserLocalStorageKeyStore()
  });

  const wallet = new WalletConnection(near, 'multisafe');

  initNear({
    near,
    wallet,
    user: {
      isConnected: wallet.isSignedIn(),
      accountId: wallet.getAccountId()
    }
  });

  initApp();
});
