import { persist } from 'easy-peasy';
import { initState } from './initState';
import { selectors } from './selectors';
import { actions } from './actions';
import { thunks } from './thunks';

export const multisafe = persist(
  {
    ...initState,
    ...actions,
    ...thunks,
    selectors,
  },
  {
    allow: ['multisafes', 'general'],
    storage: 'localStorage',
  },
);
