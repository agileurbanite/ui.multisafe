import { action } from 'easy-peasy';
import * as R from 'ramda';

// Temporary function
const nearAddressToName = address => R.compose(
  R.replace(/\.(testnet|guildnet|betanet|localnet|near)/g, ''),
  R.join(''),
  R.juxt([
    R.compose(
      R.toUpper,
      R.head
    ),
    R.tail
  ])
) (address)

export const mountMultisafe = action((state, payload) => {
  const { localMultisafe, contract, accountState, members } = payload;

  state.general.name = localMultisafe.name;
  state.general.multisafeId = localMultisafe.multisafeId;
  state.general.balance = accountState.amount;
  // TODO replace .map with a transform function
  state.members = members.map(({ account_id }) => ({ accountId: account_id, memberName: nearAddressToName(account_id)}));
  state.entities.contract = contract;
});
