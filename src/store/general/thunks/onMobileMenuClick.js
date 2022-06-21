import { thunk } from 'easy-peasy';

export const onMobileMenuClick = thunk(async (_, payload, { getStoreActions }) => {
    const actions = getStoreActions();
    const toggleMobileMenu = actions.general.toggleMobileMenu;
    toggleMobileMenu();
});
