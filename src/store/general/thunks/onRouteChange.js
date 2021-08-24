import { thunk } from 'easy-peasy';
import { getDataBeforeRenderPage } from './helpers/getDataBeforeRenderPage';

export const onRouteChange = thunk(async (_, history, { getStoreActions }) => {
  const actions = getStoreActions();
  await getDataBeforeRenderPage({ actions, history, withLoading: true });
});
