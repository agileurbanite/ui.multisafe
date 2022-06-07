import { thunk } from 'easy-peasy';
import { Account } from 'near-api-js';
import { getMultisafeContract } from '../helpers/getMultisafeContract';
import { config } from '../../../near/config';
import { listLikelyTokens } from '../../../utils/listLikelyAssets';

const getAddRequestTxs = async (multisafeId) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await fetch(`${config.backendURL}/getAddRequestTxs?${new URLSearchParams({
    multisafeId
  })}`, requestOptions);

  const body = await response.json();
  return body
}

export const onMountDashboard = thunk(
  async (_, multisafeId, { getStoreState, getStoreActions }) => {
    const state = getStoreState();
    const accountId = state.general.user.accountId;
    const near = state.general.entities.near;
    const archivalRpc = state.general.entities.archivalRpc;
    const multisafes = state.multisafe.multisafes;

    const actions = getStoreActions();
    const mountDashboard = actions.multisafe.mountDashboard;
    const setError = actions.general.setError;

    const contract = getMultisafeContract(state, multisafeId);
    const localMultisafe = multisafes.find((multisafe) => multisafe.multisafeId === multisafeId);
    const account = new Account(near.connection, multisafeId);

    const likelyTokens = await listLikelyTokens(multisafeId);
    const fungibleTokens = await Promise.all(await likelyTokens.map(async (token) => {
      const tokenMetadata = await account.viewFunction(
        token,
        'ft_metadata'
      );
      const tokenBalance = await account.viewFunction(
        token,
        'ft_balance_of',
        { account_id: multisafeId }
      );
      return { ...tokenMetadata, tokenBalance, contractName: token };
    }));

    try {
      const [balance, members, requestIds, numConfirmations, addRequestTxs] = await Promise.all([
        account.getAccountBalance(),
        contract.get_members(),
        contract.list_request_ids(),
        contract.get_num_confirmations(),
        getAddRequestTxs(multisafeId),
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
        fungibleTokens,
      });
    } catch (e) {
      setError({ isError: true, description: e.message });
    }
  },
);
