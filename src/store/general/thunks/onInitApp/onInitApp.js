import { thunk } from 'easy-peasy';

import { getDataBeforeRenderPage } from '../helpers/getDataBeforeRenderPage';
import { getNearEntities } from '../helpers/getNearEntities';
import { handleRedirectFromWallet } from './handleRedirectFromWallet/handleRedirectFromWallet';
import { isRedirect } from './isRedirect';
import { manageNavigation } from './manageNavigation';

export const onInitApp = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
    const { history, setInit } = payload;

    const actions = getStoreActions();
    const state = getStoreState();
    const initApp = actions.general.initApp;

    // This part of code is to safely rollback wallet-selector
    // https://github.com/near/ui.multisafe/pull/134
    const authKey = localStorage.getItem('near_app_wallet_auth_key');
    const walletType = state.general.user.walletType;
    const onDisconnect = actions.general.onDisconnect;
    // if wallet-selector authKey found or unsupported wallet is selected, disconnect
    if (authKey || !(walletType === 'near-wallet' || walletType === 'ledger')) {
        localStorage.removeItem('near_app_wallet_auth_key');
        onDisconnect({ history });
        await getDataBeforeRenderPage({ actions, history, withLoading: false });
        return setInit(true);
    }

    const nearEntities = await getNearEntities(getStoreState);

    initApp({ nearEntities });

    // All redirect from NEAR Wallet leads to /redirect-from-wallet route. If it is the case,
    // handle it and redirect the user to the appropriate page. If not - check if a user has access
    // to the page and redirect to the proper page
    if (isRedirect(state, history)) {
        await handleRedirectFromWallet(state, actions, history);
    } else {
        manageNavigation(state, history);
    }

    // Call onMount thunk for the page - we want to load data before the page will be mounted -
    // it allows us to avoid "screen blinking" or display the empty page to the user.
    await getDataBeforeRenderPage({ actions, history, withLoading: false });

    // Finish initialization and hide loader
    setInit(true);
});
