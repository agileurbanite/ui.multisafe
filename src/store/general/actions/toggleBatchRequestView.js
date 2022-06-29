import { action } from 'easy-peasy';

export const toggleBatchRequestView = action((state) => {
    state.batchRequestView = !state.batchRequestView;
});
