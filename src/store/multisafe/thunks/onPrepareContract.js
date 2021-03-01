import { thunk } from 'easy-peasy';
import { Contract } from 'near-api-js';
import { setContractMethods } from '../../../ui/config/config';

export const onPrepareContract = thunk(async (actions, payload, { getStoreState }) => {
  const { push, multisafeId } = payload;
  const state = getStoreState();
  const { wallet } = state.general;
  const { loadCreateMultisafePage } = actions;

  try {
    const contract = await new Contract(wallet.account(), multisafeId, {
      ...setContractMethods([], ['create']),
    });

    loadCreateMultisafePage({ contract });
    push(`/create-multisafe`);
  } catch (e) {
    throw new Error(e);
  }
});
