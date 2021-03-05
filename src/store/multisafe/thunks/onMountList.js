import { thunk } from 'easy-peasy';

export const onMountList = thunk(async (actions, payload, { getStoreState }) => {
  const { setListOpen } = payload;
  const state = getStoreState();

  try {
    const multisafes = state.persist.multisafes.map((multisafe) => ({
      ...multisafe,
      balance: '10',
    }));
    actions.mountList({ multisafes });
    setListOpen(true);
  } catch (e) {
    throw new Error(e);
  }
});
