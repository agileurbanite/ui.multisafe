import { initState } from './initState';
import { actions } from './actions';

export const persist = {
  ...initState,
  ...actions,
};
