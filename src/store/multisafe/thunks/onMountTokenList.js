import { thunk } from 'easy-peasy';
import { Account } from 'near-api-js';

import { listLikelyTokens } from '../../../utils/listLikelyAssets';

export const onMountTokenList = thunk(
  async (_, multisafeId, { getStoreState, getStoreActions }) => {
    const state = getStoreState();
    const near = state.general.entities.near;
    const actions = getStoreActions();
    const mountTokenList = actions.multisafe.mountTokenList;
    const account = new Account(near.connection, multisafeId);

    const likelyTokens = await listLikelyTokens(multisafeId);
    const fungibleTokens = await Promise.all(await likelyTokens.map(async (token) => {
      const tokenMetadata = await account.viewFunction(
        token,
        'ft_metadata'
      );
      const tokenBalance = await account.viewFunction(
        token,
        'ft_balance_of',
        { account_id: multisafeId }
      );
      return { ...tokenMetadata, tokenBalance, contractName: token };
    }));
    
    mountTokenList({
      fungibleTokens
    })
  }
)