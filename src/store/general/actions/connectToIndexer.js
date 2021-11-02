import { action } from 'easy-peasy';

export const connectToIndexer = action((slice, payload) => {
  slice.entities.indexerConnection = payload;
});
