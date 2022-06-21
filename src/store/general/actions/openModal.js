import { action } from 'easy-peasy';

export const openModal = action((slice, payload) => {
    slice.modals[payload.modal] = payload.payload;
});
