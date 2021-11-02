import { action } from 'easy-peasy';

export const initApp = action((state, payload) => {
  const { nearEntities, indexerConnection } = payload;

  state.entities.near = nearEntities.near;
  state.entities.archivalRpc = nearEntities.archivalRpc;
  state.entities.wallet = nearEntities.wallet;
  state.entities.indexerConnection = indexerConnection;
});
