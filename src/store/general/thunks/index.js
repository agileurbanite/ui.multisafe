import { onConnectLedger } from './onConnectLedger';
import { onConnectNearWallet } from './onConnectNearWallet';
import { onDisconnect } from './onDisconnect';
import { onInitApp } from './onInitApp/onInitApp';
import { onMobileMenuClick } from './onMobileMenuClick';
import { onRouteChange } from './onRouteChange';
import { onSelectLedgerAccount } from './onSelectLedgerAccount';

export const thunks = {
    onInitApp,
    onRouteChange,
    onConnectNearWallet,
    onConnectLedger,
    onDisconnect,
    onSelectLedgerAccount,
    onMobileMenuClick
};
