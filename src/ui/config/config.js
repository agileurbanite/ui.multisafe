export const contractName = 'dev-1612259671980-4872321';

export const setContractMethods = (viewMethods = [], changeMethods = []) => ({
  viewMethods,
  changeMethods
});

export const getConfig = () => {
  let config = {
    networkId: 'default',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    contractName
  };

  if (process.env.REACT_APP_ENV !== undefined) {
    config = {
      ...config,
      GAS: 200000000000000,
      DEFAULT_NEW_ACCOUNT_AMOUNT: 12,

      contractMethods: { ...setContractMethods() }
    };
  }

  if (process.env.REACT_APP_ENV === 'prod') {
    config = {
      ...config,
      networkId: 'mainnet',
      nodeUrl: 'https://rpc.mainnet.near.org',
      walletUrl: 'https://wallet.near.org',
      helperUrl: 'https://helper.mainnet.near.org',
      contractName: 'near'
    };
  }

  return config;
};
