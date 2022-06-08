import { action } from 'easy-peasy';

export const mountTokenList = action((slice, payload) => {
  const { fungibleTokens } = payload;
  slice.general.fungibleTokens = fungibleTokens;
});
