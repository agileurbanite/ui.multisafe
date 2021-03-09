import { isMember } from './isMember';
import { membership } from './membership';
import { readOnly } from './readOnly';

export const selectors = {
  isMember,
  multisafes: {
    membership,
    readOnly,
  },
};
