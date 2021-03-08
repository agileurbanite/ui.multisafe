import { action } from 'easy-peasy';

export const mountMultisafe = action((state, payload) => {
  const { localMultisafe, contract, accountState, members } = payload;

  state.general.name = localMultisafe.name;
  state.general.multisafeId = localMultisafe.multisafeId;
  state.general.balance = accountState.amount;
  state.members = members;
  state.entities.contract = contract;
});
