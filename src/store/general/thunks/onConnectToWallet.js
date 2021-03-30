import { thunk } from 'easy-peasy';

// TODO move configs to config folder
export const onConnectToWallet = thunk(async (_, __, { getStoreState, getStoreActions }) => {
  const store = getStoreState();
  const wallet = store.general.entities.wallet;
  const actions = getStoreActions();
  const connectToWallet = actions.general.connectToWallet;

  await wallet.requestSignIn(
    // random inactive account only for wallet auth
    'test.dev-1612425940555-3335158',
    'MultiSafe',
    `${window.location.origin}/get-started`,
    `${window.location.origin}/welcome?errorCode=true`,
  );

  await wallet._keyStore.clear();

  connectToWallet({
    isConnected: wallet.isSignedIn(),
    accountId: wallet.getAccountId(),
  });
});
