import { thunk } from 'easy-peasy';
import { getRoute } from '../../../ui/config/routes';

export const onLoadMultisafe = thunk(async (_, payload, { getStoreActions }) => {
  const storeActions = getStoreActions();
  const { addMultisafe } = storeActions.persist;
  const { data, push } = payload;

  addMultisafe({ data });
  push(getRoute.dashboard(data.multisafeId));
});
