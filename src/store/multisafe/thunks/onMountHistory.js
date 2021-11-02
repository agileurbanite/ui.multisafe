import { thunk } from 'easy-peasy';
import { toCamelCase } from '../../helpers/toCamelCase';
import { config } from '../../../near/config';

const getRequestTxs = async (connection, multisafeId) =>
  connection.session.call(config.getExplorerSelectCommand(), [
    `SELECT
       t.transaction_hash,
       t.block_timestamp,
       t.signer_account_id,
       ta.args
     FROM transactions t
     INNER JOIN transaction_actions ta ON t.transaction_hash = ta.transaction_hash
     WHERE t.receiver_account_id = :multisafeId
     AND (
       ta.args ->> 'method_name' = 'add_request' OR
       ta.args ->> 'method_name' = 'add_request_and_confirm' OR
       ta.args ->> 'method_name' = 'delete_request'
     )`,
    {
      multisafeId,
    },
  ]);

export const onMountHistory = thunk(async (_, __, { getStoreState, getStoreActions }) => {
  const store = getStoreState();
  const archivalRpc = store.general.entities.archivalRpc;
  const indexerConnection = store.general.entities.indexerConnection;
  const contract = store.multisafe.entities.contract;
  const multisafeId = store.multisafe.general.multisafeId;

  const actions = getStoreActions();
  const mountHistory = actions.multisafe.mountHistory;
  const setError = actions.general.setError;

  try {
    const [requestIds, _requestTxs] = await Promise.all([
      contract.list_request_ids(),
      getRequestTxs(indexerConnection, multisafeId),
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
