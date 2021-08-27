import { action } from 'easy-peasy';

export const changeMultisafeName = action((slice, payload) => {
  const multisafe = slice.multisafes.find(({ multisafeId }) => multisafeId === payload.multisafeId);
  multisafe.name = payload.data.name;
});
