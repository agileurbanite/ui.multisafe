import { action } from 'easy-peasy';

export const setModalData = action((slice, payload) => {
  Object.entries(payload.payload).forEach(([key, value]) => {
    slice.modals[payload.modal][key] = value;
  });
});
