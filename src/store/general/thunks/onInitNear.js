import { thunk } from 'easy-peasy';
import { connect, keyStores } from 'near-api-js';
import { WalletConnection } from '../../../near/api/WalletConnection';
import { config } from '../../../near/config';

const { networkId, nodeUrl, walletUrl } = config;

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
