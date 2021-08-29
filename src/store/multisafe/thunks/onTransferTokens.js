import { thunk } from 'easy-peasy';
import { utils } from 'near-api-js';

export const onTransferTokens = thunk(async (_, payload, { getStoreState }) => {
  const { onClose } = payload;
  const { recipientId, amount, withApprove } = payload.data;


  const state = getStoreState();
  const contract = state.multisafe.entities.contract;

  const method = withApprove ? 'add_request_and_confirm' : 'add_request';

  try {
    await contract[method]({
      args: {
        request: {
          receiver_id: recipientId,
          actions: [{ type: 'Transfer', amount: utils.format.parseNearAmount(amount) }],
        },
      },
    });
  } catch (e) {
    // throw new Error(e);
  }

  onClose();
});
