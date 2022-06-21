import { action } from 'easy-peasy';

export const setTemporaryData = action((slice, payload) => {
    slice.temporary = payload;
});
