import { thunk } from 'easy-peasy';

import { getNearEntities } from './helpers/getNearEntities';

export const onSelectLedgerAccount = thunk(
    async (_, payload, { getStoreState, getStoreActions }) => {
        const { accountId, pk } = payload;

        const actions = getStoreActions();
        const setUserData = actions.general.setUserData;
        const setNearEntities = actions.general.setNearEntities;

        setUserData({
            accountId,
            isConnected: true,
            walletType: 'ledger',
            publicKey: pk,
        });

        const nearEntities = await getNearEntities(getStoreState);
        setNearEntities(nearEntities);
    },
);
