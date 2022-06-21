import { action } from 'easy-peasy';

export const enableLoading = action((state) => {
    state.isLoading = true;
});
