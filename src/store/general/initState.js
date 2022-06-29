export const initState = {
    isLoading: false,
    error: {
        isError: false,
        description: '',
    },
    modals: {
        confirmActionOnLedger: null,
        selectLedgerAccount: null,
    },
    user: {
        isConnected: false,
        accountId: null,
        walletType: 'near-wallet',
        publicKey: null,
    },
    selectors: {
        hasSavedMultisafes: false,
        isNearWallet: null,
    },
    entities: {
        near: null,
        archivalRpc: null,
        wallet: null,
        indexerConnection: null,
    },
    temporary: {
        redirectAction: null,
    },
    isMobileMenuOpen: false,
    batchRequestView: true
};
