import { thunk } from 'easy-peasy';

// TODO move configs to config folder
export const onConnectToWallet = thunk(async (actions, _, { getStoreState }) => {
  const state = getStoreState();
  const { wallet } = state.general;
  const { connectToWallet } = actions;

  await wallet.requestSignIn(
    'test.dev-1612425940555-3335158',
    'MultiSafe',
    'http://localhost:3000/get-started',
    'http://localhost:3000/welcome?failed-signin'
  );

  await wallet._keyStore.clear();

  connectToWallet({
    isConnected: wallet.isSignedIn(),
    accountId: wallet.getAccountId()
  });
});
