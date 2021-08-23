import { action } from 'easy-peasy';

export const removeMultisafe = action((slice, multisafeId) => {
  slice.multisafes = slice.multisafes.filter(
    (multisafe) => multisafe.multisafeId !== multisafeId,
  );
});
