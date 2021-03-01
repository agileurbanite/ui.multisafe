import { createStore } from 'easy-peasy';
import { thunks } from './thunks';
import { general } from './general';
import { startWork } from './startWork';
import { multisafe } from './multisafe';

export const store = createStore(
  {
    general,
    startWork,
    multisafe,
    ...thunks
  },
  {
    name: 'MultiSafe'
  }
);
