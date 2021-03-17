export const initState = {
  isAppInitialized: false,
  isLoading: false,
  user: {
    isConnected: false,
    accountId: null,
  },
  selectors: {
    hasSavedMultisafes: false,
  },
  entities: {
    near: null,
    wallet: null,
  },
};
