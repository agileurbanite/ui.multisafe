import { initState } from './initState';
import { thunks } from './thunks';

export const startWork = {
    ...initState,
    ...thunks,
};
