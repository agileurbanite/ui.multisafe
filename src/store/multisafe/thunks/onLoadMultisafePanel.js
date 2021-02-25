import { thunk } from 'easy-peasy';
import { Contract } from 'near-api-js';

// TODO move configs to config folder
export const onLoadMultisafePanel = thunk(async (actions, payload, { getStoreState }) => {
  const { push, multisafeId } = payload;
  const state = getStoreState();
  const { wallet } = state.general;
  const { loadMultisafePanel } = actions;

  try {
    const contract = await new Contract(wallet.account(), multisafeId, {
      viewMethods: ['get_members', 'get_request', 'get_num_confirmations', 'list_request_ids'],
      changeMethods: ['add_request', 'confirm', 'delete_request']
    });

    loadMultisafePanel({ contract });
    push(`/multisafe/${multisafeId}/dashboard`);
  } catch (e) {
    console.error('Error', e);
  }
});
