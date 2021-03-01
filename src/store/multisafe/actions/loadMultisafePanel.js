import { action } from 'easy-peasy';

export const loadMultisafePanel = action((state, payload) => {
  state.multisig = payload.multisig;
});
