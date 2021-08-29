import { action } from 'easy-peasy';

export const closeModal = action((slice, payload) => {
  delete slice.modals[payload.modal];
});
