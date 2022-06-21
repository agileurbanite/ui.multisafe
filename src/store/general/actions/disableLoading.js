import { action } from 'easy-peasy';

export const disableLoading = action((state) => {
    state.isLoading = false;
});
