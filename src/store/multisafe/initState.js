export const initState = {
  general: {
    name: '',
    multisafeId: '',
    balance: 0,
    fungibleTokensMetadata: {},
    fungibleTokensBalances: [],
  },
  dashboard: {
    pendingRequests: [],
  },
  history: {
    requests: [],
  },
  members: [],
  multisafes: [],
  selectors: {
    multisafes: {
      membership: [],
      readOnly: [],
    },
  },
  entities: {
    contract: null,
  },
};
