import { Account } from 'near-api-js';

const code_hash_multiSave = 'EPGksnjsxBjaZkXp63ZqdXK9bFpUzrn4UfW8FrehhRQT'

export const isAccountExist = async ({ state, near, accountId }) => {
  if (!accountId) return false;

  const connection = near ? near.connection : state.general.entities.near.connection;

  try {
    const { code_hash } = await new Account(connection, accountId).state();
    
    if(code_hash === code_hash_multiSave) return true;
    
  } catch (e) {
    return false;
  }
  return null
};