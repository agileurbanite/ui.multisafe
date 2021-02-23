import { action } from 'easy-peasy';

export const initApp = action((state, payload) => {
  const { near, wallet, user } = payload;

  state.isAppInitialized = true;
  state.user = user;
  state.near = near;
  state.wallet = wallet;
});
