import BN from 'bn.js';

const general = {
  maxGas: new BN(300000000000000),
  endpoint: {
    jsonrpc: '2.0',
    id: 'viewacct',
    method: 'query',
    setParams({ account_id }) {
      return { ...this, params: { request_type: 'view_account', finality: 'final', account_id } };
    },
  },
  multisafe: {
    deleteRequestCooldown: 15 * 60 * 1000, // 15 minutes in milliseconds
  }
};


const testnet = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  archivalRpcUrl: 'https://archival-rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
  multisafeFactoryId: 'dev-1612259671980-4872321', // TODO: deploy another one
  backendURL: process.env.REACT_APP_BACKEND_URL_TESTNET || 'http://localhost:8666'
};

const mainnet = {
  networkId: 'mainnet',
  nodeUrl: 'https://rpc.mainnet.near.org',
  archivalRpcUrl: 'https://archival-rpc.mainnet.near.org',
  walletUrl: 'https://wallet.near.org',
  helperUrl: 'https://helper.mainnet.near.org',
  explorerUrl: 'https://explorer.near.org',
  multisafeFactoryId: 'multisafe.dev-eclipseeer.near', // TODO: deploy another one
  backendURL: process.env.REACT_APP_BACKEND_URL_MAINNET || 'http://localhost:8666'
};

const configs = {
  testnet,
  mainnet,
};

const createHelpers = (config) => ({
  getCheckAccountInExplorerUrl: (accountId) => `${config.explorerUrl}/accounts/${accountId}`
});

const getNearConfig = (network = 'testnet') => {
  const config = configs[network];
  return {
    ...general,
    ...config,
    ...createHelpers(config),
  };
};

export const config = getNearConfig(process.env.REACT_APP_NETWORK);
