import NonFungibleTokens from '@services/NonFungibleTokens';
import { listLikelyNfts } from '@utils/listLikelyAssets';
import { thunk } from 'easy-peasy';

export const onMountNonFungibleTokenList = thunk(
    async (_, multisafeId, { getStoreState, getStoreActions }) => {
        const state = getStoreState();
        const near = state.general.entities.near;
        const nftMetadata = state.multisafe.general.nonFungibleTokensMetadata;
        const actions = getStoreActions();
        const mountNonFungibleTokenList = actions.multisafe.mountNonFungibleTokenList;

        const nonFungibleTokensService = new NonFungibleTokens(near.connection);
        const likelyNFTs = await listLikelyNfts(multisafeId);

        const nonFungibleTokensMetadata = {};
        const nonFungibleTokens = await Promise.all(await likelyNFTs.map(async (contractName) => {
            if (!nftMetadata[contractName]) {
                const fetchedMetadata = await nonFungibleTokensService.getMetadata({ contractName });
                nonFungibleTokensMetadata[contractName] = fetchedMetadata;
            }
            else {
                nonFungibleTokensMetadata[contractName] = nftMetadata[contractName];
            }
            const tokens = await nonFungibleTokensService.getTokens(
                {
                    contractName,
                    accountId: multisafeId,
                    base_uri: nonFungibleTokensMetadata[contractName].base_uri
                });

            const tokenBalance = await nonFungibleTokensService.getBalanceOf({ contractName, accountId: multisafeId });

            return { ...nonFungibleTokensMetadata[contractName], tokenBalance, contractName, tokens };
        }));

        mountNonFungibleTokenList({
            nonFungibleTokens,
            nonFungibleTokensMetadata
        });
    }
);
