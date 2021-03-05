import { thunk } from 'easy-peasy';

export const onMountList = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  const { setListOpen } = payload;
  const store = getStoreState();
  const multisafes = store.multisafe.multisafes;
  const actions = getStoreActions();
  const mountList = actions.multisafe.mountList;

  try {
    const _multisafes = multisafes.map((multisafe) => ({
      ...multisafe,
      balance: '10',
    }));
    mountList({ multisafes: _multisafes });
    setListOpen(true);
  } catch (e) {
    throw new Error(e);
  }
});
