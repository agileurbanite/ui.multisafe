import { connect, keyStores, WalletConnection } from 'near-api-js';
import { LedgerSigner } from '../../../../near/LedgerSigner';
import { config } from '../../../../near/config';

const { networkId, nodeUrl, walletUrl, archivalRpcUrl } = config;

const getNearConnectConfig = (connectionType) => {
  if (connectionType === 'near-wallet')
    return {
      networkId,
      nodeUrl,
      walletUrl,
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    };

  if (connectionType === 'ledger')
    return {
      networkId,
      nodeUrl,
      signer: new LedgerSigner(),
    };

  if (connectionType === 'archival-rpc')
    return {
      networkId,
      nodeUrl: archivalRpcUrl,
      keyStore: new keyStores.InMemoryKeyStore(),
    };

  throw new Error(
    `Wrong connection type, must be 'near-wallet', 'ledger' or 'archival-rpc',
     got '${connectionType}' instead`,
  );
};

export const getNearEntities = async () => {
  const near = await connect(getNearConnectConfig('near-wallet'));
  const archivalRpc = await connect(getNearConnectConfig('archival-rpc'));

  const wallet = new WalletConnection(near, 'multisafe');

  return {
    near,
    archivalRpc,
    wallet,
  };
};
