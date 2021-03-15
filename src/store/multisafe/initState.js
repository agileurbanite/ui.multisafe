import { persist } from 'easy-peasy';

export const initState = {
  general: {
    name: '',
    multisafeId: '',
    balance: 0,
  },
  dashboard: {
    transactions: [],
  },
  members: [],
  multisafes: [],
  selectors: {
    multisafes: {
      membership: [],
      readOnly: [],
    },
  },
  entities: {
    contract: null,
  },
};

export const initPersistentState = persist(initState, {
  allow: ['multisafes'],
  storage: 'localStorage',
});
