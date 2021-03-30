import { thunk } from 'easy-peasy';
import { getRoute } from '../../../ui/config/routes';

export const onLoadMultisafe = thunk(async (_, payload, { getStoreActions }) => {
  const { data, push } = payload;
  const actions = getStoreActions();
  const addMultisafe = actions.multisafe.addMultisafe;

  addMultisafe({ data });
  push(getRoute.dashboard(data.multisafeId));
});
