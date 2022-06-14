import { thunk } from 'easy-peasy';
import { listLikelyNfts } from '../../../utils/listLikelyAssets';
import NonFungibleTokens from '../../../services/NonFungibleTokens';

export const onMountNonFungibleTokenList = thunk(
  async (_, multisafeId, { getStoreState, getStoreActions }) => {
    const state = getStoreState();
    const near = state.general.entities.near;
    const actions = getStoreActions();
    const mountNonFungibleTokenList = actions.multisafe.mountNonFungibleTokenList;

    const nonFungibleTokensService = new NonFungibleTokens(near.connection);
    const likelyNFTs = await listLikelyNfts(multisafeId);

    const nonFungibleTokens = await Promise.all(await likelyNFTs.map(async (contractName) => {
      const tokenMetadata = await nonFungibleTokensService.getMetadata({ contractName });
      const tokens = await nonFungibleTokensService.getTokens(
        { contractName, 
          accountId: multisafeId,
          base_uri: tokenMetadata.base_uri });
      const tokenBalance = await nonFungibleTokensService.getBalanceOf({ contractName, accountId: multisafeId }); 
      return { ...tokenMetadata, tokenBalance, contractName, tokens };
    }));
    
    mountNonFungibleTokenList({
      nonFungibleTokens
    })
  }
)