import { action } from 'easy-peasy';

export const loadCreateMultisafe = action((state, payload) => {
  const { multisigFactory } = payload;
  state.multisigFactory = multisigFactory;
});
