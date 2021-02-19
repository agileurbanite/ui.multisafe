import { createStore } from 'easy-peasy';
import { general } from './general';

export const store = createStore({
  general,
  startWork: {
    getStarted: {},
    createMultisafe: {}
  },
  multiSafe: {}
});
