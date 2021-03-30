import { action } from 'easy-peasy';

export const addMultisafe = action((state, payload) => {
  const { multisafeId, name } = payload.data;
  state.multisafes.push({ multisafeId, name, members: [], balance: 0 });
});
