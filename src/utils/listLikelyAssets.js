import { config } from '../near/config';

export async function listLikelyNfts(accountId) {
    // not tested yet
    // const requestOptions = {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' },
    // };
    // const response = await fetch(`${config.indexerServiceUrl}/account/${accountId}/likelyNFTs`, requestOptions);
    // return response.json();
}

export async function listLikelyTokens(accountId) {
    // return ['usdn.testnet', 'wrap.testnet']
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(`${config.indexerServiceUrl}/account/${accountId}/likelyTokens`, requestOptions);
    return response.json();
}
