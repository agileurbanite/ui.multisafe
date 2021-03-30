import { action } from 'easy-peasy';

export const connectToWallet = action((state, payload) => {
  const { isConnected, accountId } = payload;

  state.user.isConnected = isConnected;
  state.user.accountId = accountId;
});
