import { thunk } from 'easy-peasy';

import { getDataBeforeRenderPage } from '../helpers/getDataBeforeRenderPage';
import { getNearEntities } from '../helpers/getNearEntities';
import { handleRedirectFromWallet } from './handleRedirectFromWallet/handleRedirectFromWallet';
import { isRedirect } from './isRedirect';
import { manageNavigation } from './manageNavigation';

export const onInitApp = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
    const { history, setInit, selector, accountId, selectedWalletId } = payload;

    const actions = getStoreActions();
    const state = getStoreState();
    const initApp = actions.general.initApp;
    const isConnected = state.general.user.isConnected;
    const isSignedIn = selector.isSignedIn();

    const nearEntities = await getNearEntities(getStoreState);
    
    initApp({ nearEntities });

    if (isSignedIn && isConnected !== isSignedIn) {
        if (selectedWalletId === 'ledger') {
            const onLedgerConnectSuccess = actions.general.onSelectLedgerAccount;
            const ledgerData = localStorage.getItem('near-wallet-selector:ledger:accounts');
            const pk = ledgerData && JSON.parse(ledgerData)?.[0].publicKey;
            onLedgerConnectSuccess({ accountId, pk, history });
        } else {
            const onConnectSuccess = actions.general.setUserData;        
            onConnectSuccess({
                accountId,
                isConnected: isSignedIn,
                walletType: selectedWalletId,
                publicKey: null,
            });
        }
    }

    // All redirect from NEAR Wallet leads to /redirect-from-wallet route. If it is the case,
    // handle it and redirect the user to the appropriate page. If not - check if a user has access
    // to the page and redirect to the proper page
    if (isRedirect(state, history)) {
        await handleRedirectFromWallet(state, actions, history);
    } else {
        manageNavigation(state, history, selector);
    }

    // Call onMount thunk for the page - we want to load data before the page will be mounted -
    // it allows us to avoid "screen blinking" or display the empty page to the user.
    await getDataBeforeRenderPage({ actions, history, withLoading: false });

    // Finish initialization and hide loader
    setInit(true);
});
