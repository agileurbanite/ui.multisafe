import { onInitNear } from './onInitNear';
import { onRouteChange } from './onRouteChange';
import { onConnectNearWallet } from './onConnectNearWallet';
import { onDisconnect } from './onDisconnect';
import { onHandleWalletRedirect } from './onHandleWalletRedirect';
import { onConnectToIndexer } from './onConnectToIndexer';

export const thunks = {
  onInitNear,
  onRouteChange,
  onConnectNearWallet,
  onDisconnect,
  onHandleWalletRedirect,
  onConnectToIndexer,
};
