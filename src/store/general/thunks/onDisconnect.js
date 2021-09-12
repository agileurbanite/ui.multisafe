import { thunk } from 'easy-peasy';
import { routes } from '../../../ui/config/routes';
import { getIndexerConnection } from './onInitApp/getIndexerConnection';
import { getNearEntities } from './onInitApp/getNearEntities';

export const onDisconnect = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  const { history } = payload;

  const state = getStoreState();
  const connection = state.general.entities.indexerConnection;

  const actions = getStoreActions();
  const resetState = actions.resetState;
  const initApp = actions.general.initApp;

  connection.close();
  resetState();
  localStorage.clear();

  history.push(routes.welcome);

  const [nearEntities, indexerConnection] = await Promise.all([
    getNearEntities(getStoreState),
    getIndexerConnection(),
  ]);

  initApp({ nearEntities, indexerConnection });
});
