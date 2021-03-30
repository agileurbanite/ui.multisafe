import { action } from 'easy-peasy';

export const setError = action((state, payload) => {
  state.error.isError = payload.isError;
  state.error.description = payload.description;
});
