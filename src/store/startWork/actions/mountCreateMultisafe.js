import { action } from 'easy-peasy';

export const mountCreateMultisafe = action((state, payload) => {
  state.entities.factoryContract = payload.factoryContract;
});
