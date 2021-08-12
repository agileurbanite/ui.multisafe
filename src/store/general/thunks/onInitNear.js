import { thunk } from 'easy-peasy';
import { connect, keyStores } from 'near-api-js';
import { WalletConnection } from '../../../near/api/WalletConnection';
import { config } from '../../../near/config';

const { networkId, nodeUrl, walletUrl, archivalRpcUrl } = config;

export const onInitNear = thunk(async (_, __, { getStoreActions }) => {
  const actions = getStoreActions();
  const initNear = actions.general.initNear;

  const near = await connect({
    networkId,
    nodeUrl,
    walletUrl,
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  });

  const archivalRpc = await connect({
    networkId,
    nodeUrl: archivalRpcUrl,
    walletUrl,
    keyStore: new keyStores.InMemoryKeyStore(),
  });

  const wallet = new WalletConnection(near, 'multisafe');

  initNear({
    near,
    archivalRpc,
    wallet,
    user: {
      isConnected: wallet.isSignedIn(),
      accountId: wallet.getAccountId(),
    },
  });
});
