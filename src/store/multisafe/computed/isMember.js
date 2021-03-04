import { computed } from 'easy-peasy';

// TODO convert account_id to camelCase
export const isMember = computed(
  [
    (_, storeState) => storeState.general.user.accountId,
    (_, storeState) => storeState.multisafe.members,
  ],
  (accountId, members) => members.some(({ account_id }) => account_id === accountId),
);
