import { action } from 'easy-peasy';

export const mountList = action((state, payload) => {
  state.multisafes = payload.data.map(([balance, members], index) => ({
    ...state.multisafes[index],
    balance: balance.available,
    members: members.map(({ account_id }) => ({ accountId: account_id })),
  }));
});
