import { computed } from 'easy-peasy';

export const isNearWallet = computed(
    [(_, store) => store.general.user.walletType],
    (walletType) => (walletType === 'my-near-wallet' || walletType === 'near-wallet'),
);
