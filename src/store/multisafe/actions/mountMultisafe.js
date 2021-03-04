import { action } from 'easy-peasy';

export const mountMultisafe = action((state, payload) => {
  const { localMultisafe, contract, accountState, members } = payload;
  state.name = localMultisafe.name;
  state.multisafeId = localMultisafe.multisafeId;
  state.balance = accountState.amount;
  state.members = members;
  state.contract = contract;
});
