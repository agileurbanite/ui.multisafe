import autobahn from 'autobahn';
import { config } from '../../../../near/config';

export const getIndexerConnection = async () => {
  const connection = new autobahn.Connection({
    url: config.indexerUrl,
    realm: 'near-explorer',
  });

  connection.open();

  return new Promise((resolve) => {
    connection.onopen = () => {
      resolve(connection);
    };
  });
};
