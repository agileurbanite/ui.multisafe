import { Account } from 'near-api-js';

export const isAccountExist = async ({ state, near, accountId }) => {
  if (!accountId) return false;

  const connection = near ? near.connection : state.general.entities.near.connection;

  try {
    await new Account(connection, accountId).state();
    return true;
  } catch (e) {
    return false;
  }
};
