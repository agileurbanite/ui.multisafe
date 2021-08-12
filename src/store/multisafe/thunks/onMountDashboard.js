import { thunk } from 'easy-peasy';
import { config } from '../../../near/config';

const getAddRequestTxs = async (connection, multisafeId) =>
  connection.session.call(config.getExplorerSelectCommand(), [
    `SELECT
       t.transaction_hash,
       t.block_timestamp,
       t.status,
       t.signer_account_id,
       ta.args
     FROM transactions t
     INNER JOIN transaction_actions ta ON t.transaction_hash = ta.transaction_hash
     WHERE t.receiver_account_id = :multisafeId
     AND (
       ta.args ->> 'method_name' = 'add_request'
       OR ta.args ->> 'method_name' = 'add_request_and_confirm'
     )`,
    {
      multisafeId,
    },
  ]);

export const onMountDashboard = thunk(async (_, __, { getStoreState, getStoreActions }) => {
  const store = getStoreState();
  const accountId = store.general.user.accountId;
  const archivalRpc = store.general.entities.archivalRpc;
  const indexerConnection = store.general.entities.indexerConnection;
  const contract = store.multisafe.entities.contract;
  const multisafeId = store.multisafe.general.multisafeId;

  const actions = getStoreActions();
  const mountDashboard = actions.multisafe.mountDashboard;
  const setError = actions.general.setError;

  try {
    const [requestIds, numConfirmations, addRequestTxs] = await Promise.all([
      contract.list_request_ids(),
      contract.get_num_confirmations(),
      getAddRequestTxs(indexerConnection, multisafeId),
    ]);

    const [requests, txsStatuses] = await Promise.all([
      Promise.all(
        requestIds.map((request_id) =>
          Promise.all([
            contract.get_request({ request_id }),
            contract.get_confirmations({ request_id }),
          ]),
        ),
      ),
      Promise.all(
        addRequestTxs.map(({ transaction_hash, signer_account_id }) =>
          archivalRpc.connection.provider.txStatus(transaction_hash, signer_account_id),
        ),
      ),
    ]);

    mountDashboard({
      requests,
      requestIds,
      addRequestTxs,
      txsStatuses,
      accountId,
      numConfirmations,
    });
  } catch (e) {
    setError({ isError: true, description: e });
  }
});
