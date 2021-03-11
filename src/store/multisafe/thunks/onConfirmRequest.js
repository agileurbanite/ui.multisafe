import { thunk } from 'easy-peasy';

export const onConfirmRequest = thunk(async (_, payload, { getState }) => {
  const store = getState();
  const contract = store.entities.contract;

  try {
    await contract.confirm({ request_id: payload.requestId });
  } catch (e) {
    throw new Error(e);
  }
});
