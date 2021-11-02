import { action } from 'easy-peasy';

export const closeModal = action((slice, payload) => {
 slice.modals[payload.modal] = null;
});
