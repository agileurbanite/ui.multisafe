import { thunk } from 'easy-peasy';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import { createClient } from 'near-ledger-js';
import { PublicKey } from 'near-api-js/lib/utils';
import { KeyType } from 'near-api-js/lib/utils/key_pair';
import { getAccountIdsByPublicKey } from '../../helpers/getAccountIdsByPublicKey';
import { routes } from '../../../ui/config/routes';

export const onConnectLedgerViaUsb = thunk(async (_, payload, { getStoreState }) => {
  const { history } = payload;

  const state = getStoreState();

  try {
    // TODO add error handler on every step

    // Connect ledger and check if all is good
    const transport = await TransportWebHID.create();
    const ledger = await createClient(transport);
    console.log(ledger);
    const version = await ledger.getVersion();
    console.log(version);

    // Get public key
    // const rawPk = await ledger.getPublicKey();
    // const pk = new PublicKey({ keyType: KeyType.ED25519, data: rawPk }).toString();
    const pk = "ed25519:Cehn9GS2TfVmLycaATBmB58mooxRizRWBEr9r85epPV";
    console.log(pk);

    // Close session
    await transport.close();

    // Get accounts list associated with current Ledger
    const accounts = await getAccountIdsByPublicKey(pk);
    console.log(accounts);
    //
    history.replace(routes.selectLedgerAccount, { accounts });
  } catch (e) {
    console.log(e);
  }
});
