import { createStore } from 'easy-peasy';
import { general } from './general';
import { startWork } from './startWork';
import { multisafe } from './multisafe';

export const store = createStore(
  {
    general,
    startWork,
    multisafe
  },
  {
    name: 'MultiSafe'
  }
);
