import { thunk } from 'easy-peasy';
import { listLikelyTokens } from '../../../utils/listLikelyAssets';
import FungibleTokens from '../../../services/FungibleTokens';

export const onMountTokenList = thunk(
  async (_, multisafeId, { getStoreState, getStoreActions }) => {
    const state = getStoreState();
    const near = state.general.entities.near;
    const tokensMetadata = state.multisafe.general.fungibleTokensMetadata;
    const actions = getStoreActions();
    const mountTokenBalances = actions.multisafe.mountTokenBalances;
    const mountTokensMetadata = actions.multisafe.mountTokensMetadata;
    const fungibleTokensService = new FungibleTokens(near.connection);
    const likelyTokens = await listLikelyTokens(multisafeId);
    // make it so that: newFungibleTokenMetadata = {} and if it has something, then call mountTokensMetadata with a spread of previousmetadata and newmetadata
    const fungibleTokensMetadata = {};
    const fungibleTokens = await Promise.all(await likelyTokens.map(async (token) => {
      // checks if metadata exists, if not we fetch it, else we just pull from cache
      if (!tokensMetadata[token]) {
        const fetchedMetadata = await fungibleTokensService.getMetadata({ contractName: token });
        fungibleTokensMetadata[token] = fetchedMetadata;
      }
      else {
        fungibleTokensMetadata[token] = tokensMetadata[token];
      }
      // fetch balance for each token
      const tokenBalance = await fungibleTokensService.getBalanceOf({ contractName: token, accountId: multisafeId }); 
      return { tokenBalance, contractName: token };
    }));
    
    mountTokenBalances({
      fungibleTokens
    });
    mountTokensMetadata({
      fungibleTokensMetadata
    });
  }
)