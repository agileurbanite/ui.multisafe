const testnet = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  archivalRpcUrl: 'https://archival-rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
  indexerUrl: 'wss://near-explorer-wamp.onrender.com/ws',
  multisafeFactoryId: 'dev-1612259671980-4872321',
  multisafe: {
    deleteRequestCooldown: 15 * 60 * 1000, // 15 minutes in milliseconds
  },
  endpoint: {
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'query',
    setParams({ account_id }) {
      return { ...this, params: { request_type: 'view_account', finality: 'final', account_id } };
    },
  },
};

const createHelpers = (config) => ({
  getCheckAccountInExplorerUrl: (accountId) => `${config.explorerUrl}/accounts/${accountId}`,
  getExplorerSelectCommand: () =>
    `com.nearprotocol.${config.networkId}.explorer.select:INDEXER_BACKEND`,
});

const getNearConfig = () => {
  const config = testnet;
  return {
    ...config,
    ...createHelpers(config),
  };
};

// TODO pass the env variable to get the real config based on the env where it runs
export const config = getNearConfig();
