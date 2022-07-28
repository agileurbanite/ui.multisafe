import * as R from 'ramda';

import { config } from '../near/config';


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
