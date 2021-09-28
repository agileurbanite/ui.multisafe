import { thunk } from 'easy-peasy';
import { Account } from 'near-api-js';
import { config } from '../../../near/config';
import { getMultisafeContract } from '../helpers/getMultisafeContract';

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

export const onMountDashboard = thunk(
  async (_, multisafeId, { getStoreState, getStoreActions }) => {
    const state = getStoreState();
    const accountId = state.general.user.accountId;
    const near = state.general.entities.near;
    const archivalRpc = state.general.entities.archivalRpc;
    const indexerConnection = state.general.entities.indexerConnection;
    const multisafes = state.multisafe.multisafes;

    const actions = getStoreActions();
    const mountDashboard = actions.multisafe.mountDashboard;
    const setError = actions.general.setError;

    const contract = getMultisafeContract(state, multisafeId);
    const localMultisafe = multisafes.find((multisafe) => multisafe.multisafeId === multisafeId);

    try {
      const [balance, members, requestIds, numConfirmations, addRequestTxs] = await Promise.all([
        new Account(near.connection, multisafeId).getAccountBalance(),
        contract.get_members(),
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
        localMultisafe,
        contract,
        balance,
        members,
      });
    } catch (e) {
      setError({ isError: true, description: e });
    }
  },
);
