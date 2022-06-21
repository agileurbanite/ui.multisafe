import { action } from 'easy-peasy';

export const mountNonFungibleTokenList = action((slice, payload) => {
    const { nonFungibleTokens, nonFungibleTokensMetadata } = payload;
    slice.general.nonFungibleTokens = nonFungibleTokens;
    slice.general.nonFungibleTokensMetadata = nonFungibleTokensMetadata;
});
  
