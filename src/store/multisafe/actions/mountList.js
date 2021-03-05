import { action } from 'easy-peasy';

export const mountList = action((state, payload) => {
  const { localMultisafe } = payload;
  state.name = localMultisafe.name;
});
