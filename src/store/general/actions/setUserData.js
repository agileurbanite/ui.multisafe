import { action } from 'easy-peasy';

export const setUserData = action((slice, payload) => {
  slice.user = payload;
});
