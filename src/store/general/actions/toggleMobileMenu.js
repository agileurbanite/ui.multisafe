import { action } from 'easy-peasy';

export const toggleMobileMenu = action((state, payload) => {
  state.isMobileMenuOpen = !state.isMobileMenuOpen;
});
