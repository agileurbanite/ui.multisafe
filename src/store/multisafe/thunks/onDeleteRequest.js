import { thunk } from 'easy-peasy';

export const onDeleteRequest = thunk(async (_, payload, { getState }) => {
  const store = getState();
  const contract = store.entities.contract;

  try {
    await contract.delete_request({ request_id: payload.requestId });
  } catch (e) {
    throw new Error(e);
  }
});
