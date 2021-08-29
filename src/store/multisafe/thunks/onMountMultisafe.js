import { thunk } from 'easy-peasy';
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
