import { thunk } from 'easy-peasy';
import { Contract } from 'near-api-js';
import { near } from '../../../ui/config/near';

export const onMountMultisafe = thunk(async (actions, payload, { getStoreState }) => {
  const { multisafeId } = payload;
  const state = getStoreState();
  const { wallet } = state.general;
  const { mountMultisafe } = actions;

  try {
    const contract = await new Contract(wallet.account(), multisafeId, near.multisafe.methods);
    console.log(contract.contractId);
    mountMultisafe({ contract });
  } catch (e) {
    throw new Error(e);
  }
});
