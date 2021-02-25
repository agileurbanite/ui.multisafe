import { action } from 'easy-peasy';

export const loadMultisafePanel = action((state, payload) => {
  const { contract } = payload;

  state.contract = contract;
});
