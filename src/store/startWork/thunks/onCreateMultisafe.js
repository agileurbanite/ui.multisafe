import { thunk } from 'easy-peasy';
import { utils } from 'near-api-js';
import { spaceToSnake } from '../../../ui/utils/format';

const serializeData = ({ name, members, num_confirmations, amount }) => ({
  name: spaceToSnake(name),
  num_confirmations: Number(num_confirmations),
  amount: utils.format.parseNearAmount(amount),
  members: members.map(({ account_id }) => ({ account_id })),
  GAS: 1e14,
});

export const onCreateMultisafe = thunk(async (actions, payload, { getState }) => {
  const { multisigFactory } = getState();
  const { data } = payload;

  const serializedData = serializeData(data);

  try {
    await multisigFactory.create(
      {
        name: serializedData.name,
        members: serializedData.members,
        num_confirmations: serializedData.num_confirmations,
      },
      serializedData.GAS,
      serializedData.amount,
    );
  } catch (error) {
    throw new Error(error);
  }
});
