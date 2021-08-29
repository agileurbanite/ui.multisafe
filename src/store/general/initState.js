export const initState = {
  isLoading: false,
  error: {
    isError: false,
    description: '',
  },
  modals: {},
  // user: {
  //   isConnected: false,
  //   accountId: null,
  //   walletType: 'near-wallet',
  //   publicKey: null,
  // },
  user: {
    isConnected: true,
    accountId: 'eclipser.testnet',
    walletType: 'ledger',
    publicKey: 'ed25519:Cehn9GS2TfVmLycaATBmB58mooxRizRWBEr9r85epPV',
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
};
