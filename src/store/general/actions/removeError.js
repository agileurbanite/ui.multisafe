import { action } from 'easy-peasy';

export const removeError = action((state) => {
  state.error.isError = false;
  state.error.description = '';
});
