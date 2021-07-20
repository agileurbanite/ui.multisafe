export const routes = {
  root: '/',
  welcome: '/welcome',
  connectWallet: '/connect-wallet',
  connectLedger: '/connect-wallet/ledger',
  selectLedgerAccount:  '/connect-wallet/ledger/select-account',
  getStarted: '/get-started',
  createMultisafe: '/create-multisafe',
  loadMultisafe: '/load-multisafe',
  dashboard: '/multisafe/:multisafeId/dashboard',
  members: '/multisafe/:multisafeId/members',
};

export const getRoute = {
  dashboard: (multisafeId) => `/multisafe/${multisafeId}/dashboard`,
  members: (multisafeId) => `/multisafe/${multisafeId}/members`,
};
