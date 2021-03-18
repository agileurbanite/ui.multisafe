import { getDataBeforeRenderPage } from '../../../store/general/thunks/helpers/getDataBeforeRenderPage';
import { setInitRoute } from './setInitRoute';

export const onInit = async (store, history, setInit) => {
  await store.persist.resolveRehydration();
  setInitRoute(history, store);

  const actions = store.getActions();
  await actions.general.onInitNear({ history });
  await getDataBeforeRenderPage(actions, history, false);

  setInit(true);
};
