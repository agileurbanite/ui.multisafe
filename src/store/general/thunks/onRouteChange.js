import { thunk } from 'easy-peasy';
import { getDataBeforeRenderPage } from './helpers/getDataBeforeRenderPage';

export const onRouteChange = thunk(async (_, history, { getStoreActions, getStoreState }) => {
  const state = getStoreState();
  const actions = getStoreActions();
  await getDataBeforeRenderPage({ actions, history, withLoading: true });
  const toggleMobileMenu = actions.general.toggleMobileMenu;
  if(state.general.isMobileMenuOpen) {
    toggleMobileMenu();
  }
});
