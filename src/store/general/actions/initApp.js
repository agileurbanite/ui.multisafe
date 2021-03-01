import { action } from 'easy-peasy';

export const initApp = action((state) => {
  state.isAppInitialized = true;
});
