import { onInitNear } from './onInitNear';
import { onRouteChange } from './onRouteChange';
import { onConnectToWallet } from './onConnectToWallet';
import { onDisconnect } from './onDisconnect';
import { onHandleWalletRedirect } from './onHandleWalletRedirect';
import { onConnectToIndexer } from './onConnectToIndexer';

export const thunks = {
  onInitNear,
  onRouteChange,
  onConnectToWallet,
  onDisconnect,
  onHandleWalletRedirect,
  onConnectToIndexer,
};
