import * as nearApiJs from 'near-api-js';

import { config } from '../near/config';

const NFT_TRANSFER_GAS = config.gas.transfer;
const ADD_REQUEST_AND_CONFIRM_GAS = config.gas.add_and_confirm;

// contract might require an attached depositof of at least 1 yoctoNear on transfer methods
// "This 1 yoctoNEAR is not enforced by this standard, but is encouraged to do. While ability to receive attached deposit is enforced by this token."
// from: https://github.com/near/NEPs/issues/141
const NFT_TRANSFER_DEPOSIT = '1';

export const TOKENS_PER_PAGE = 4;

// Fungible Token Standard
// https://github.com/near/NEPs/tree/master/specs/Standards/FungibleToken

export default class FungibleTokens {

    constructor(connection) {
        this.connection = connection;
        this.viewFunctionAccount = new nearApiJs.Account(this.connection, 'dontcare');;
    };

    getStorageBalance = async ({ contractName, accountId }) => this.viewFunctionAccount.viewFunction(
        contractName,
        'storage_balance_of',
        { account_id: accountId }
    );

    getMetadata = async({ contractName }) => this.viewFunctionAccount.viewFunction(
        contractName,
        'nft_metadata'
    );
    
    getBalanceOf = async ({ contractName, accountId }) => this.viewFunctionAccount.viewFunction(
        contractName,
        'nft_supply_for_owner',
        { account_id: accountId }
    );

    //

    getToken = async ({ contractName, tokenId, base_uri }) => {
        const token = await this.viewFunctionAccount.viewFunction(contractName, 'nft_token', { token_id: tokenId });

        // need to restructure response for Mintbase NFTs for consistency with NFT spec
        if (token.id && !token.token_id) {
            token.token_id = token.id.toString();
            delete token.id;
        }

        if (token.owner_id && token.owner_id.Account) {
            token.owner_id = token.owner_id.Account;
        }

        if (!token.metadata || !token.metadata.media) {
            token.metadata = {
                ...token.metadata,
                ...(await this.getTokenMetadata(contractName, tokenId, base_uri)),
            };
        }

        return this.mapTokenMediaUrl(token, base_uri);
    };

    getTokenMetadata = async (contractName, tokenId, base_uri) => {
        let metadata = await this.viewFunctionAccount.viewFunction(contractName, 'nft_token_metadata', { token_id: tokenId });
        const { media, reference } = metadata;
        if (!media && reference) {
            metadata = await (await fetch(`${base_uri}/${reference}`)).json();
        }
        return metadata;
    };

    getTokens = async ({ contractName, accountId, base_uri, fromIndex = 0 }) => {
        let tokens;
        try {
            const tokenIds = await this.viewFunctionAccount.viewFunction(contractName, 'nft_tokens_for_owner_set', { account_id: accountId });
            tokens = await Promise.all(
                tokenIds.slice(fromIndex, TOKENS_PER_PAGE + fromIndex)
                    .map(async (token_id) => ({
                        token_id: token_id.toString(),
                        owner_id: accountId,
                        metadata: await this.getTokenMetadata(contractName, token_id.toString(), base_uri),
                    }))
            );
        } catch (e) {
            if (!e.toString().includes('FunctionCallError(MethodResolveError(MethodNotFound))')) {
                throw e;
            }

            tokens = await this.viewFunctionAccount.viewFunction(contractName, 'nft_tokens_for_owner', {
                account_id: accountId,
                from_index: fromIndex.toString(),
                limit: TOKENS_PER_PAGE
            });
        }
        return tokens.filter(({ metadata }) => !!metadata)
            .map((token) => this.mapTokenMediaUrl(token, base_uri));
    };

    buildMediaUrl = (media, base_uri) => {
        // return the provided media string if it is empty or already in a URI format
        if (!media || media.includes('://') || media.startsWith('data:image')) {
            return media;
        }

        if (base_uri) {
            return `${base_uri}/${media}`;
        }

        return `https://cloudflare-ipfs.com/ipfs/${media}`;
    };

    mapTokenMediaUrl = ({ metadata, ...token }, base_uri) => {
        const { media } = metadata;
        return {
            ...token,
            metadata: {
                ...metadata,
                mediaUrl: this.buildMediaUrl(media, base_uri),
            }
        };
    };

    //

    addTransferRequest = async ({multisafeContract, withApprove, receiverId, tokenId, contractName}) => {
        const method = withApprove ? 'add_request_and_confirm' : 'add_request';
        const args = Buffer.from(`{"token_id": "${tokenId}", "receiver_id": "${receiverId}"}`)
            .toString('base64');
        return multisafeContract[method](
            {
                args: {
                    request: {
                        receiver_id: contractName,
                        actions: [{
                            type: 'FunctionCall',
                            method_name: 'nft_transfer',
                            args,
                            deposit: NFT_TRANSFER_DEPOSIT,
                            gas: NFT_TRANSFER_GAS,
                        }]
                    },
                },
                gas: ADD_REQUEST_AND_CONFIRM_GAS 
            },
        );
    };
}
