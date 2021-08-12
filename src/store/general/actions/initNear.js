import { action } from 'easy-peasy';

export const initNear = action((state, payload) => {
  const { near, archivalRpc, wallet, user } = payload;

  state.user = user;
  state.entities.near = near;
  state.entities.archivalRpc = archivalRpc;
  state.entities.wallet = wallet;
});
