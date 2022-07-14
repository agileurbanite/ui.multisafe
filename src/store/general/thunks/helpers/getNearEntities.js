import { connect, keyStores, WalletConnection } from 'near-api-js';

import { config } from '../../../../near/config';
import { LedgerSigner } from '../../../../near/LedgerSigner';

const { networkId, nodeUrl, walletUrl, archivalRpcUrl } = config;

const getNearConnectConfig = ({ connectionType, getStoreState }) => {
    if (connectionType === 'rpc_my-near-wallet' || connectionType === 'rpc_near-wallet') {
        return {
            networkId,
            nodeUrl,
            walletUrl,
            keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        };
    }

    if (connectionType === 'rpc_ledger')
        return {
            networkId,
            nodeUrl,
            signer: new LedgerSigner(getStoreState),
        };

    if (connectionType === 'archival-rpc_read-only')
        return {
            networkId,
            nodeUrl: archivalRpcUrl,
            keyStore: new keyStores.InMemoryKeyStore(),
        };

    throw new Error(
    `Wrong connection type, must be 'rpc_near-wallet', 'rpc_ledger' or 'archival-rpc_read-only',
     got '${connectionType}' instead`,
    );
};

export const getNearEntities = async (getStoreState, selector) => {
    const state = getStoreState();
    const walletType = (selector && selector.isSignedIn())
        ? await selector.wallet().id
        : state.general.user.walletType;

    const near = await connect(
        getNearConnectConfig({
            connectionType: `rpc_${walletType}`,
            getStoreState,
        }),
    );

    const archivalRpc = await connect(
        getNearConnectConfig({
            connectionType: 'archival-rpc_read-only',
        }),
    );

    const wallet = (walletType === 'my-near-wallet' || walletType === 'near-wallet')
        ? new WalletConnection(near, 'near_app')
        : null;

    return {
        near,
        archivalRpc,
        wallet,
    };
};
