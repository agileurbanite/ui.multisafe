import { getDataBeforeRenderPage } from '../../../store/general/thunks/helpers/getDataBeforeRenderPage';
import { setInitRoute } from './setInitRoute';

export const onInit = async (store, history, setInit) => {
  await store.persist.resolveRehydration();
  const actions = store.getActions();
  console.log(history.location);

  await actions.general.onInitNear({ history });
  setInitRoute(history, store);

  await getDataBeforeRenderPage(actions, history, false);
  setInit(true);
};
