import { thunk } from 'easy-peasy';

import FungibleTokens from '../../../services/FungibleTokens';
import { listLikelyTokens } from '../../../utils/listLikelyAssets';

export const onMountTokenList = thunk(
    async (_, multisafeId, { getStoreState, getStoreActions }) => {
        const state = getStoreState();
        const near = state.general.entities.near;
        const tokensMetadata = state.multisafe.general.fungibleTokensMetadata;
        const actions = getStoreActions();
        const mountTokenList = actions.multisafe.mountTokenList;
        const mountTokensMetadata = actions.multisafe.mountTokensMetadata;
        const fungibleTokensService = new FungibleTokens(near.connection);
        const likelyTokens = await listLikelyTokens(multisafeId);

        const fungibleTokensMetadata = {};
        const fungibleTokens = await Promise.all(await likelyTokens.map(async (token) => {
            // fetch balance for each token
            const tokenBalance = await fungibleTokensService.getBalanceOf({ contractName: token, accountId: multisafeId });
            // checks if metadata exists, if not we fetch it, else we just pull from cache
            if (!tokensMetadata[token]) {
                const fetchedMetadata = await fungibleTokensService.getMetadata({ contractName: token });
                fungibleTokensMetadata[token] = fetchedMetadata;
            }
            else {
                fungibleTokensMetadata[token] = tokensMetadata[token];
            }
            return { ...fungibleTokensMetadata[token], tokenBalance, contractName: token };
        }));
    
        // keeping metadata within the fungibleTokens as well for easier access, leads to duplicated information but cleaner code
        mountTokenList({
            fungibleTokens
        });
        // keeping metadata separate for quick check on whether we need to update metadata
        mountTokensMetadata({
            fungibleTokensMetadata
        });
    }
);
