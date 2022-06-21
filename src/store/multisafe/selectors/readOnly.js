import { computed } from 'easy-peasy';

export const readOnly = computed(
    [(_, store) => store.general.user.accountId, (_, store) => store.multisafe.multisafes],
    (accountId, multisafes) =>
        multisafes.filter(({ members }) => members.every((member) => member.accountId !== accountId)),
);
