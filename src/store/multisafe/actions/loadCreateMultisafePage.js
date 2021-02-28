import { action } from 'easy-peasy';

export const loadCreateMultisafePage = action((state, payload) => {
  const { contract } = payload;

  state.contract = contract;
});
