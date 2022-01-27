import qs from 'query-string';

export const routes = {
  // Technical
  redirectFromWallet: '/redirect-from-wallet',
  root: '/',
  // Pages
  welcome: '/welcome',
  getStarted: '/get-started',
  createMultisafe: '/create-multisafe',
  loadMultisafe: '/load-multisafe',
  dashboard: '/multisafe/:multisafeId/dashboard',
  history: '/multisafe/:multisafeId/history',
  members: '/multisafe/:multisafeId/members',
};

export const getRoute = {
  dashboard: (multisafeId) => `/multisafe/${multisafeId}/dashboard`,
  history: (multisafeId) => `/multisafe/${multisafeId}/history`,
  members: (multisafeId) => `/multisafe/${multisafeId}/members`,
  callbackUrl: (params) => `${window.location.origin}/redirect-from-wallet?${qs.stringify(params)}`,
};
