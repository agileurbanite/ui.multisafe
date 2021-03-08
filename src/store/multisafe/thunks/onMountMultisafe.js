import { thunk } from 'easy-peasy';
import { Contract } from 'near-api-js';
import { near as nearConfig } from '../../../ui/config/near';

export const onMountMultisafe = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  const { multisafeId } = payload;
  const store = getStoreState();
  const near = store.general.entities.near;
  const wallet = store.general.entities.wallet;
  const multisafes = store.multisafe.multisafes;
  const actions = getStoreActions();
  const mountMultisafe = actions.multisafe.mountMultisafe;

  const contract = new Contract(wallet.account(), multisafeId, nearConfig.multisafe.methods);
  const localMultisafe = multisafes.find((multisafe) => multisafe.multisafeId === multisafeId);

  try {
    const account = await near.account(multisafeId);
    const [accountState, members] = await Promise.all([account.state(), contract.get_members()]);

    mountMultisafe({
      localMultisafe,
      contract,
      accountState,
      members,
    });
  } catch (e) {
    throw new Error(e);
  }
});
