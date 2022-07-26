import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import { handleLedgerError } from '@store/helpers/handleLedgerError';
import { thunk } from 'easy-peasy';
import { PublicKey } from 'near-api-js/lib/utils';
import { KeyType } from 'near-api-js/lib/utils/key_pair';
import { createClient } from 'near-ledger-js';

import { getAccountIdsByPublicKey } from './helpers/getAccountIdsByPublicKey';

export const onConnectLedger = thunk(async (_, payload, { getStoreActions }) => {
    const { closeConnectLedgerModal } = payload;

    const actions = getStoreActions();
    const openModal = actions.general.openModal;
    const setModalData = actions.general.setModalData;
    const closeModal = actions.general.closeModal;

    let client;

    closeConnectLedgerModal();
    openModal({ modal: 'confirmActionOnLedger', payload: { actionName: 'Get public key' } });

    try {
        const transport = await TransportWebHID.create();
        client = await createClient(transport);
        const rawPk = await client.getPublicKey();

        const pk = new PublicKey({ keyType: KeyType.ED25519, data: rawPk }).toString();
        setModalData({ modal: 'confirmActionOnLedger', payload: { showLoader: true } });
        const accounts = await getAccountIdsByPublicKey(pk);

        closeModal({ modal: 'confirmActionOnLedger' });
        openModal({ modal: 'selectLedgerAccount', payload: { accounts, pk } });
    } catch (err) {
        handleLedgerError(err, (error) =>
            setModalData({ modal: 'confirmActionOnLedger', payload: { error } }),
        );
    } finally {
        await client?.transport?.close();
    }
});
