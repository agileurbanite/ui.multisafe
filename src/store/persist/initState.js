import { persist } from 'easy-peasy';

export const initState = persist(
  {
    multisafes: [
      {
        multisafeId: 'test.dev-1612425940555-3335158',
        name: 'My First Awesome MultiSafe',
      },
    ],
  },
  {
    storage: 'localStorage',
  },
);
