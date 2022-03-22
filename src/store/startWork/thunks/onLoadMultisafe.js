import { thunk } from 'easy-peasy';
import { config } from '../../../near/config';
import { getRoute } from '../../../ui/config/routes';

export const onLoadMultisafe = thunk(async (_, payload, { getStoreActions }) => {
  const { data, push } = payload;

  const actions = getStoreActions();
  const addMultisafe = actions.multisafe.addMultisafe;

  const multisafeId = `${data.multisafeId}.${config.multisafeFactoryId}`;

  addMultisafe({ multisafeId, name: data.name });
  push(getRoute.dashboard(multisafeId));
});
