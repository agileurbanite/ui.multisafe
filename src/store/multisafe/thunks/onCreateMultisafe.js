import { thunk } from 'easy-peasy';

export const onCreateMultisafe = thunk(async (actions, payload, { getState }) => {
  const { contract } = getState();
  const {
    data: { name, members, num_confirmations, amount, GAS },
    push,
  } = payload;
  const { loadSuccessPage } = actions;

  try {
    await contract.create(
      {
        name,
        members,
        num_confirmations,
      },
      GAS,
      amount,
    );

    loadSuccessPage({ contract });
    push(`/success`);
  } catch (error) {
    throw new Error(error);
  }
});
