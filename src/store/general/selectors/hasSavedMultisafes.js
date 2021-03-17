import { computed } from 'easy-peasy';

export const hasSavedMultisafes = computed(
  [(_, store) => store.multisafe.multisafes],
  (multisafes) => multisafes.length > 0,
);
