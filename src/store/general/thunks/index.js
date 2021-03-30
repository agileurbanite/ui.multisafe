import { onInitNear } from './onInitNear';
import { onRouteChange } from './onRouteChange';
import { onConnectToWallet } from './onConnectToWallet';
import { onDisconnect } from './onDisconnect';
import { onHandleWalletRedirect } from './onHandleWalletRedirect';

export const thunks = {
  onInitNear,
  onRouteChange,
  onConnectToWallet,
  onDisconnect,
  onHandleWalletRedirect,
};
