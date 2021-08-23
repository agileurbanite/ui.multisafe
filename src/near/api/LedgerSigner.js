/* eslint-disable */
import { Signer } from 'near-api-js';
import { PublicKey } from 'near-api-js/lib/utils';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import { createClient } from 'near-ledger-js';

export class LedgerSigner extends Signer {
  async getPublicKey(accountId, networkId) {
    console.log('getPublicKey', accountId, networkId);
    return PublicKey.from('ed25519:Cehn9GS2TfVmLycaATBmB58mooxRizRWBEr9r85epPV');
  }

  async signMessage(message, accountId, networkId) {
    // TODO Check errors
    const transport = await TransportWebHID.create();

    const client = await createClient(transport);

    // TODO Add error handling
    const signature = await client.sign(message);
    const publicKey = await this.getPublicKey(accountId, networkId);

    console.log('signMessage');
    await client.transport.close();

    return {
      signature,
      publicKey,
    };
  }
}
