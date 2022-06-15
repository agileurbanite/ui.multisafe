import { action } from 'easy-peasy';

export const mountTokenBalances = action((slice, payload) => {
  const { fungibleTokens } = payload;
  slice.general.fungibleTokens = fungibleTokens;
});
