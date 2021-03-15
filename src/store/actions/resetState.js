import { action } from 'easy-peasy';
import { initState as general } from '../general/initState';
import { initState as multisafe } from '../multisafe/initState';
import { initState as startWork } from '../startWork/initState';

export const resetState = action((state) => {
  state.general = general;
  state.multisafe = multisafe;
  state.startWork = startWork;
});
