import { persist } from 'easy-peasy';

export const initState = persist(
  {
    multisafes: [],
  },
  {
    storage: 'localStorage',
  },
);
