import { createStore } from 'easy-peasy';

import { actions } from './actions';
import { general } from './general';
import { multisafe } from './multisafe';
import { startWork } from './startWork';

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
