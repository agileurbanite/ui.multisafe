import { thunk } from 'easy-peasy';
import { Contract } from 'near-api-js';
import { near } from '../../../ui/config/near';

const { methods } = near.multisig;

export const onMountMultisafe = thunk(async (actions, payload, { getStoreState }) => {
  const { multisafeId } = payload;
  const state = getStoreState();
  const { wallet } = state.general;
  const { loadMultisafePanel } = actions;

  // await new Promise((res) => {
  //   setTimeout(() => {
  //     res();
  //   }, 500);
  // });

  try {
    const multisig = await new Contract(wallet.account(), multisafeId, methods);
    loadMultisafePanel({ multisig });
  } catch (e) {
    throw new Error(e);
  }
});
