import { persist } from 'easy-peasy';

import { actions } from './actions';
import { initState } from './initState';
import { selectors } from './selectors';
import { thunks } from './thunks';

export const general = persist(
    {
        ...initState,
        ...actions,
        ...thunks,
        selectors,
    },
    {
        allow: ['user', 'temporary', 'batchRequestView'],
        storage: 'localStorage',
    },
);
