import { thunk } from 'easy-peasy';
import { listLikelyTokens } from '../../../utils/listLikelyAssets';
import FungibleTokens from '../../../services/FungibleTokens';

export const onMountTokenList = thunk(
  async (_, multisafeId, { getStoreState, getStoreActions }) => {
    const state = getStoreState();
    const near = state.general.entities.near;
    const actions = getStoreActions();
    const mountTokenList = actions.multisafe.mountTokenList;

    const fungibleTokensService = new FungibleTokens(near.connection);
    const likelyTokens = await listLikelyTokens(multisafeId);
    const fungibleTokens = await Promise.all(await likelyTokens.map(async (token) => {

      const tokenMetadata = await fungibleTokensService.getMetadata({ contractName: token });
      const tokenBalance = await fungibleTokensService.getBalanceOf({ contractName: token, accountId: multisafeId }); 
      return { ...tokenMetadata, tokenBalance, contractName: token };
    }));
    
    mountTokenList({
      fungibleTokens
    })
  }
)