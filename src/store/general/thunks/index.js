import { onInitApp } from './onInitApp/onInitApp';
import { onRouteChange } from './onRouteChange';
import { onConnectNearWallet } from './onConnectNearWallet';
import { onDisconnect } from './onDisconnect';

export const thunks = {
  onInitApp,
  onRouteChange,
  onConnectNearWallet,
  onDisconnect,
};
