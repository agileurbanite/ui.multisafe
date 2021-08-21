import { thunk } from 'easy-peasy';
import autobahn from 'autobahn';
import { config } from '../../../near/config';

const { indexerUrl } = config;

export const onConnectToIndexer = thunk(async (_, __, { getStoreActions }) => {
  const actions = getStoreActions();
  const connectToIndexer = actions.general.connectToIndexer;

  const connection = new autobahn.Connection({
    url: indexerUrl,
    realm: 'near-explorer',
  });

  // connection.open();

  // await new Promise((resolve) => {
  //   connection.onopen = () => {
  //     resolve();
  //   };
  // });

  connectToIndexer(connection);
});
