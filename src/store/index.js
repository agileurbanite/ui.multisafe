import { createStore } from 'easy-peasy';
import { actions } from './actions';
import { general } from './general';
import { startWork } from './startWork';
import { connectWallet } from './connectWallet';
import { multisafe } from './multisafe';

export const store = createStore(
  {
    ...actions,
    general,
    startWork,
    multisafe,
    connectWallet,
  },
  {
    name: 'MultiSafe',
  },
);
