import { initState } from './initState';
import { selectors } from './selectors';
import { actions } from './actions';
import { thunks } from './thunks';

export const multisafe = {
  ...initState,
  ...actions,
  ...thunks,
  selectors,
};
