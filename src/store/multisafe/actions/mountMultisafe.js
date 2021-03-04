import { action } from 'easy-peasy';

export const mountMultisafe = action((state, payload) => {
  state.contract = payload.contract;
});
