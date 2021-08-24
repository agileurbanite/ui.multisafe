import { persist } from 'easy-peasy';
import { initState } from './initState';
import { actions } from './actions';
import { thunks } from './thunks';
import { selectors } from './selectors';

export const general = persist(
  {
    ...initState,
    ...actions,
    ...thunks,
    selectors,
  },
  {
    allow: ['user', 'temporary'],
    storage: 'localStorage',
  },
);
