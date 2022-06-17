export const initState = {
  general: {
    name: '',
    multisafeId: '',
    balance: 0,
    fungibleTokens: [],
    fungibleTokensMetadata: {},
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
