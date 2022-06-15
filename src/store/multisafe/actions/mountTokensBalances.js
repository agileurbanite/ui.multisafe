import { action } from 'easy-peasy';

export const mountTokensBalances = action((slice, payload) => {
  const { fungibleTokensBalances } = payload;
  slice.general.fungibleTokensBalances = fungibleTokensBalances;
});
