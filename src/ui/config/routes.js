export const routes = {
  root: '/',
  welcome: '/welcome',
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
