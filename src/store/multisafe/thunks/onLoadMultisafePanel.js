import { thunk } from 'easy-peasy';
import { Contract } from 'near-api-js';

export const onLoadMultisafePanel = thunk(async (actions, payload, { getStoreState }) => {
  const { multisafeId } = payload;
  const state = getStoreState();
  const { wallet } = state.general;
  const { loadMultisafePanel } = actions;

  await new Promise((res) => {
    setTimeout(() => {
      res();
    }, 500);
  });

  try {
    const contract = await new Contract(wallet.account(), multisafeId, {
      viewMethods: ['get_members', 'get_request', 'get_num_confirmations', 'list_request_ids'],
      changeMethods: ['add_request', 'confirm', 'delete_request'],
    });

    loadMultisafePanel({ contract });
  } catch (e) {
    throw new Error(e);
  }
});
