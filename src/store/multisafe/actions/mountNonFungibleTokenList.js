import { action } from 'easy-peasy';

export const mountNonFungibleTokenList = action((slice, payload) => {
    const { nonFungibleTokens } = payload;
    slice.general.nonFungibleTokens = nonFungibleTokens;
});
  