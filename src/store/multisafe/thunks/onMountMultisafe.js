import { thunk } from 'easy-peasy';
import { Contract } from 'near-api-js';
import { near as nearConfig } from '../../../ui/config/near';

export const onMountMultisafe = thunk(async (actions, payload, { getStoreState }) => {
  const { multisafeId } = payload;
  const state = getStoreState();
  const { near, wallet } = state.general;
  const { mountMultisafe } = actions;

  const contract = new Contract(wallet.account(), multisafeId, nearConfig.multisafe.methods);
  const localMultisafe = state.persist.multisafes.find(
    (multisafe) => multisafe.multisafeId === multisafeId,
  );

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
