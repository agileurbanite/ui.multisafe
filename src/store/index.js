import { createStore } from 'easy-peasy';
import { actions } from './actions';
import { general } from './general';
import { startWork } from './startWork';
import { multisafe } from './multisafe';

export const store = createStore(
  {
    ...actions,
    general,
    startWork,
    multisafe,
  },
  {
    name: 'MultiSafe',
  },
);
