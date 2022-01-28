import { action } from 'easy-peasy';

export const toggleMobileMenu = action((state) => {
  state.isMobileMenuOpen = !state.isMobileMenuOpen;
});
