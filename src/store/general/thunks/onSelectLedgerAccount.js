import { thunk } from 'easy-peasy';
import { matchPath } from 'react-router';
import { routes } from '../../../ui/config/routes';

export const onSelectLedgerAccount = thunk(async (_, payload, { getStoreActions }) => {
  const { accountId, pk, history } = payload;

  const actions = getStoreActions();
  const setUserData = actions.general.setUserData;
  const closeModal = actions.general.closeModal;

  const match = matchPath(history.location.pathname, { path: [routes.welcome], exact: true });

  setUserData({
    accountId,
    isConnected: true,
    walletType: 'ledger',
    publicKey: pk,
  });

  closeModal({ modal: 'selectLedgerAccount' });

  if (match) history.replace(routes.getStarted);
});
