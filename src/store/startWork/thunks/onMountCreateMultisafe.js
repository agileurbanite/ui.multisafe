import { thunk } from 'easy-peasy';
import { Contract } from '../../../near/api/Сontract';
import { config } from '../../../near/config';

const { contractId, methods } = config.multisafeFactory;

export const onMountCreateMultisafe = thunk(async (_, __, { getStoreState, getStoreActions }) => {
  const store = getStoreState();
  const wallet = store.general.entities.wallet;
  const actions = getStoreActions();
  const mountCreateMultisafe = actions.startWork.mountCreateMultisafe;

  try {
    const factoryContract = await new Contract(wallet.account(), contractId, methods);
    mountCreateMultisafe({ factoryContract });
  } catch (e) {
    throw new Error(e);
  }
});
