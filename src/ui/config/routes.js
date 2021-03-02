export const routes = {
  welcome: '/welcome',
  getStarted: '/get-started',
  createMultisafe: '/create-multisafe',
  loadMultisafe: '/load-multisafe',
  dashboard: '/multisafe/:id/dashboard',
  success: '/success',
};

export const getRoute = {
  dashboard: (multisafeId) => `/multisafe/${multisafeId}/dashboard`,
};
