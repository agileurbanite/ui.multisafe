import { thunk } from 'easy-peasy';
import { utils } from 'near-api-js';

export const onTransferTokens = thunk(async (actions, payload, { getState }) => {
  const { contract } = getState();

  try {
    await contract.add_request({
      request: {
        receiver_id: 'eclipseeer.testnet',
        actions: [{ type: 'Transfer', amount: utils.format.parseNearAmount('1') }]
      }
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error', e);
  }
});
