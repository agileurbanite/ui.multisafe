import { thunk } from 'easy-peasy';
import { toCamelCase } from '../../helpers/toCamelCase';
import { config } from '../../../near/config';

const getRequestTxs = async (multisafeId) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await fetch(`${config.backendURL}/getRequestTxs?${new URLSearchParams({
    multisafeId
  })}`, requestOptions);

  const body = await response.json();
  return body
}

export const onMountHistory = thunk(async (_, __, { getStoreState, getStoreActions }) => {
  const store = getStoreState();
  const archivalRpc = store.general.entities.archivalRpc;
  const contract = store.multisafe.entities.contract;
  const multisafeId = store.multisafe.general.multisafeId;

  const actions = getStoreActions();
  const mountHistory = actions.multisafe.mountHistory;
  const setError = actions.general.setError;

  try {
    const [requestIds, _requestTxs] = await Promise.all([
      contract.list_request_ids(),
      getRequestTxs(multisafeId),
    ]);
    const requestTxs = toCamelCase(_requestTxs);

    const requestTxStatuses = await Promise.all(
      requestTxs.map(({ transactionHash, signerAccountId }) =>
        archivalRpc.connection.provider.txStatus(transactionHash, signerAccountId),
      ),
    );

    mountHistory({
      requestIds,
      requestTxs,
      requestTxStatuses: toCamelCase(requestTxStatuses),
    });
  } catch (e) {
    setError({ isError: true, description: e.message });
  }
});
