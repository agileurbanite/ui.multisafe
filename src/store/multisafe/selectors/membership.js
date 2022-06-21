import { computed } from 'easy-peasy';

export const membership = computed(
    [(_, store) => store.general.user.accountId, (_, store) => store.multisafe.multisafes],
    (accountId, multisafes) =>
        multisafes.filter(({ members }) => members.some((member) => member.accountId === accountId)),
);
