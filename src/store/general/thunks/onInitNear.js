import { thunk } from 'easy-peasy';
import { connect, keyStores, WalletConnection } from 'near-api-js';
import { near as nearConfig } from '../../../config/near';

const { networkId, nodeUrl, walletUrl } = nearConfig;

export const onInitNear = thunk(async (_, __, { getStoreActions }) => {
  const actions = getStoreActions();
  const initNear = actions.general.initNear;

  const near = await connect({
    networkId,
    nodeUrl,
    walletUrl,
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  });

  const wallet = new WalletConnection(near, 'multisafe');

  initNear({
    near,
    wallet,
    user: {
      isConnected: wallet.isSignedIn(),
      accountId: wallet.getAccountId(),
    },
  });
});
