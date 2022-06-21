import { persist } from 'easy-peasy';

import { actions } from './actions';
import { initState } from './initState';
import { selectors } from './selectors';
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
