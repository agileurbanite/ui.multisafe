import { getRoute } from '@ui/config/routes';
import { thunk } from 'easy-peasy';

export const onLoadMultisafe = thunk(async (_, payload, { getStoreActions }) => {
    const { data, push } = payload;

    const actions = getStoreActions();
    const addMultisafe = actions.multisafe.addMultisafe;

    const multisafeId = `${data.multisafeId}`;

    addMultisafe({ multisafeId, name: data.name });
    push(getRoute.dashboard(multisafeId));
});
