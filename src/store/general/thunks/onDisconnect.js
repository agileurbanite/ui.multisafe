import { thunk } from 'easy-peasy';
import { routes } from '../../../ui/config/routes';

export const onDisconnect = thunk((_, payload, { getStoreActions }) => {
  const { history } = payload;
  const actions = getStoreActions();
  const resetState = actions.resetState;
  const onInitApp = actions.general.onInitApp;

  resetState();
  localStorage.clear();
  history.push(routes.welcome);
  onInitApp({ history });
});
