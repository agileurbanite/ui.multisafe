import { thunk } from 'easy-peasy';
import { Contract } from 'near-api-js';
import { near } from '../../../ui/config/near';

const { contractId, methods } = near.multisigFactory;

export const onMountCreateMultisafe = thunk(async (actions, payload, { getStoreState }) => {
  const state = getStoreState();
  const { wallet } = state.general;
  const { loadCreateMultisafe } = actions;

  try {
    const multisigFactory = await new Contract(wallet.account(), contractId, methods);
    loadCreateMultisafe({ multisigFactory });
  } catch (e) {
    throw new Error(e);
  }
});
