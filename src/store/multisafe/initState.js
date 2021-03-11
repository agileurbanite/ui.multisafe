import { persist } from 'easy-peasy';

export const initState = persist(
  {
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
    entities: {
      contract: null,
    },
  },
  {
    allow: ['multisafes'],
    storage: 'localStorage',
  },
);
