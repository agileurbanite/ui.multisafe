import { action } from 'easy-peasy';

export const addMultisafe = action((slice, payload) => {
  const { multisafeId, name } = payload;
  slice.multisafes.push({ multisafeId, name, members: [], balance: 0 });
});
