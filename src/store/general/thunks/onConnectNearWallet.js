import { thunk } from 'easy-peasy';

export const onConnectNearWallet = thunk(async (_, __, { getStoreState }) => {
  const store = getStoreState();
  const wallet = store.general.entities.wallet;

  await wallet.requestSignIn({
    successUrl: `${window.location.origin}/get-started`,
    failureUrl: `${window.location.origin}/welcome?errorCode=true`,
  });
});
