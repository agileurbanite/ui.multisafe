import { Account } from 'near-api-js';

import { config } from '../near/config';


export const isAccountExist = async ({ state, near, accountId }) => {
    if (!accountId) return false;

    const connection = near ? near.connection : state.general.entities.near.connection;

    try {
        const { code_hash } = await new Account(connection, accountId).state();
    
        if (config.multisafeContractHashes.includes(code_hash)) return true;
    
    } catch (e) {
        return false;
    }
    return null;
};
