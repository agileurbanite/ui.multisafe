import { action } from 'easy-peasy';

export const initNear = action((state, payload) => {
  const { near, wallet, user } = payload;

  state.user = user;
  state.near = near;
  state.wallet = wallet;
});
