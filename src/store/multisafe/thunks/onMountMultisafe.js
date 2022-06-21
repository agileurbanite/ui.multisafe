import { thunk } from 'easy-peasy';
import { Account } from 'near-api-js';

import { getMultisafeContract } from '../helpers/getMultisafeContract';

export const onMountMultisafe = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
    const { multisafeId } = payload;

    const state = getStoreState();
    const near = state.general.entities.near;
    const multisafes = state.multisafe.multisafes;

    const actions = getStoreActions();
    const mountMultisafe = actions.multisafe.mountMultisafe;

    const contract = getMultisafeContract(state, multisafeId);
    const localMultisafe = multisafes.find((multisafe) => multisafe.multisafeId === multisafeId);

    try {
        const [balance, members, numConfirmations] = await Promise.all([
            new Account(near.connection, multisafeId).getAccountBalance(),
            contract.get_members(),
            contract.get_num_confirmations(),
        ]);

        mountMultisafe({
            localMultisafe,
            contract,
            balance,
            members,
            numConfirmations
        });
    } catch (e) {
        actions.general.setError({ isError: true, description: e.message });
    }
});
