import { action } from 'easy-peasy';

export const loadCreateMultisafe = action((state, payload) => {
  state.factoryContract = payload.factoryContract;
});
