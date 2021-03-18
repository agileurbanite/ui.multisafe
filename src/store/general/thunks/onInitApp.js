import { thunk } from 'easy-peasy';
import { connect, keyStores, WalletConnection } from 'near-api-js';
import { getDataBeforeRenderPage } from './helpers/getDataBeforeRenderPage';
import { near as nearConfig } from '../../../config/near';

const { networkId, nodeUrl, walletUrl } = nearConfig;

export const onInitApp = thunk(async (_, payload, { getStoreActions }) => {
  const { history } = payload;
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

  await getDataBeforeRenderPage(actions, history, false);
});
