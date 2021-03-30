import { thunk } from 'easy-peasy';
import { utils } from 'near-api-js';

export const onTransferTokens = thunk(async (_, payload, { getState }) => {
  const { recipientId, amount, withApprove } = payload.data;
  const store = getState();
  const contract = store.entities.contract;

  const method = withApprove ? 'add_request_and_confirm' : 'add_request';

  try {
    await contract[method]({
      payload: {
        request: {
          receiver_id: recipientId,
          actions: [{ type: 'Transfer', amount: utils.format.parseNearAmount(amount) }],
        },
      },
    });
  } catch (e) {
    throw new Error(e);
  }
});
