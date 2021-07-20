import { thunk } from 'easy-peasy';

export const onSelectLedgerAccount = thunk(async (_, payload, { getStoreState }) => {
  const { history } = payload;

  const state = getStoreState();


});
