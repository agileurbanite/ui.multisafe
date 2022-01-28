import { onInitApp } from './onInitApp/onInitApp';
import { onRouteChange } from './onRouteChange';
import { onConnectNearWallet } from './onConnectNearWallet';
import { onConnectLedger } from './onConnectLedger';
import { onDisconnect } from './onDisconnect';
import { onSelectLedgerAccount } from './onSelectLedgerAccount';
import { onMobileMenuClick } from './onMobileMenuClick';

export const thunks = {
  onInitApp,
  onRouteChange,
  onConnectNearWallet,
  onConnectLedger,
  onDisconnect,
  onSelectLedgerAccount,
  onMobileMenuClick
};
