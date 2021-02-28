import { action } from 'easy-peasy';

export const loadSuccessPage = action((state, payload) => {
  const { contract } = payload;

  state.contract = contract;
});
