import { action } from 'easy-peasy';

export const initNear = action((state, payload) => {
  const { near, wallet, user } = payload;

  state.user = user;
  state.entities.near = near;
  state.entities.wallet = wallet;
});
