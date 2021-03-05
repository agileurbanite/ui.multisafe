import { persist } from 'easy-peasy';

export const initState = persist(
  {
    general: {
      name: '',
      multisafeId: '',
      balance: 0,
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
