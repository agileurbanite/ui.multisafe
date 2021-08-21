export const routes = {
  root: '/',
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
};
