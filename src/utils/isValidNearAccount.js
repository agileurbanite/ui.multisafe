import * as R from 'ramda';

import { config } from '../near/config';


export const patterns = {
    memberAddress:
        /^[a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]\.?(testnet|betanet|localnet|guildnet|near)?/g,
    amount: /^([5-9]|0?[1-9][0-9]+)$/g,
};

const isValidNearAccount = async (value) => {
    const response = await fetch(config.nodeUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(config.endpoint.setParams({ account_id: value })),
    });
    const result = await response.json();
    return R.has('result', result);
};

export default isValidNearAccount;
