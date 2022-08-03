import { thunk } from 'easy-peasy';
import { matchPath } from 'react-router';

import { routes } from '../../../ui/config/routes';
import { getNearEntities } from './helpers/getNearEntities';

export const onSelectLedgerAccount = thunk(
    async (_, payload, { getStoreState, getStoreActions }) => {
        const { accountId, pk, history } = payload;

        const actions = getStoreActions();
        const setUserData = actions.general.setUserData;
        const setNearEntities = actions.general.setNearEntities;
        const closeModal = actions.general.closeModal;

        const match = matchPath(history.location.pathname, { path: [routes.welcome], exact: true });

        setUserData({
            accountId,
            isConnected: true,
            walletType: 'ledger',
            publicKey: pk,
        });

        const nearEntities = await getNearEntities(getStoreState);
        setNearEntities(nearEntities);

        closeModal({ modal: 'selectLedgerAccount' });

        if (match) history.replace(routes.getStarted);
    },
);
