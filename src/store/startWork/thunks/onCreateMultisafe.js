import { thunk } from 'easy-peasy';
import { utils } from 'near-api-js';
import { spaceToSnake } from '../../../utils/format';

const serializeData = ({ name, members, num_confirmations, amount }) => ({
  name: spaceToSnake(name),
  num_confirmations: Number(num_confirmations),
  amount: utils.format.parseNearAmount(amount),
  members: members.map(({ account_id }) => ({ account_id })),
  GAS: 1e14,
});

export const onCreateMultisafe = thunk(async (_, payload, { getStoreState }) => {
  const { data } = payload;
  const store = getStoreState();
  const factoryContract = store.startWork.entities.factoryContract;

  const { name, members, num_confirmations, amount, GAS } = serializeData(data);

  try {
    await factoryContract.create({ name, members, num_confirmations }, GAS, amount);
  } catch (error) {
    throw new Error(error);
  }
});
