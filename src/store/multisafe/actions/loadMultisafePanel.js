import { action } from 'easy-peasy';

export const loadMultisafePanel = action((state, payload) => {
  state.contract = payload.contract;
});
