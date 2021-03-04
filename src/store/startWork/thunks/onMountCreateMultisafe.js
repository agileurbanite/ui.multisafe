import { thunk } from 'easy-peasy';
import { Contract } from 'near-api-js';
import { near } from '../../../ui/config/near';

const { contractId, methods } = near.multisafeFactory;

export const onMountCreateMultisafe = thunk(async (actions, payload, { getStoreState }) => {
  const state = getStoreState();
  const { wallet } = state.general;
  const { loadCreateMultisafe } = actions;

  try {
    const factoryContract = await new Contract(wallet.account(), contractId, methods);
    loadCreateMultisafe({ factoryContract });
  } catch (e) {
    throw new Error(e);
  }
});
