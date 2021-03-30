import { computed } from 'easy-peasy';

// TODO convert account_id to camelCase
export const isMember = computed(
  [(_, store) => store.general.user.accountId, (_, store) => store.multisafe.members],
  (accountId, members) => members.some((member) => member.accountId === accountId),
);
