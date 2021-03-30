import { thunk } from 'easy-peasy';
import { getDataBeforeRenderPage } from './helpers/getDataBeforeRenderPage';

export const onRouteChange = thunk(async (_, payload, { getStoreActions }) => {
  const { history } = payload;
  const actions = getStoreActions();

  await getDataBeforeRenderPage(actions, history, true);
});
