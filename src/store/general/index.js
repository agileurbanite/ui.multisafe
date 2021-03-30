import { initState } from './initState';
import { actions } from './actions';
import { thunks } from './thunks';
import { selectors } from './selectors';

export const general = {
  ...initState,
  ...actions,
  ...thunks,
  selectors,
};
