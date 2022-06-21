import { action } from 'easy-peasy';

export const deleteTemporaryData = action((slice) => {
    slice.temporary = {};
});
