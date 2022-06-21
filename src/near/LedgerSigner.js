import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import { Signer } from 'near-api-js';
import { PublicKey } from 'near-api-js/lib/utils';
import { createClient } from 'near-ledger-js';

const defaultHooks = {
    onBeforeSignTx: () => {},
    onAfterSignTx: () => {},
};

export class LedgerSigner extends Signer {
    constructor(getStoreState) {
        super();
        this.client = null;
        this.hooks = defaultHooks;
        this.getStoreState = getStoreState;
    }

    setHooks(hooks) {
        this.hooks = { ...this.hooks, ...hooks };
    }

    resetHooks() {
        this.hooks = defaultHooks;
    }

    async getPublicKey() {
        return PublicKey.from(this.getStoreState().general.user.publicKey);
    }

    async signMessage(message) {
        try {
            const transport = await TransportWebHID.create();
            this.client = await createClient(transport);

            this.hooks.onBeforeSignTx();
            const signature = await this.client.sign(message);
            const publicKey = await this.getPublicKey();
            this.hooks.onAfterSignTx();

            return {
                signature,
                publicKey,
            };
        } catch (error) {
            error.fromLedgerSigner = true;
            throw error;
        } finally {
            await this.client?.transport?.close();
        }
    }
}
