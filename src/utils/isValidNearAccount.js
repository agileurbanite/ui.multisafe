import * as R from 'ramda';

import { config } from '../near/config';

export const patterns = {
    accountId: /^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/g,
    createMultisafeAmount: /^([5-9]|0?[1-9][0-9]+)$/g,
    amount: /^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/g
};

export const isImplicitAccount = (accountId) =>
    accountId && accountId.length === 64 && !accountId.includes('.');

const isValidNearAccount = async (account) => {
    const response = await fetch(config.nodeUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(config.endpoint.setParams({ account_id: account })),
    });
    const result = await response.json();
    return R.has('result', result);
};

export default isValidNearAccount;
