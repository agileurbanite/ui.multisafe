import { action } from 'easy-peasy';

export const mountList = action((state, payload) => {
  state.multisafes = payload.data.map(([contractState, members], index) => ({
    ...state.multisafes[index],
    balance: contractState.amount,
    members,
  }));
});
