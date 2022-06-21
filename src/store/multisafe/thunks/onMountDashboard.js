import { thunk } from 'easy-peasy';
import { Account } from 'near-api-js';

import { config } from '../../../near/config';
import { getMultisafeContract } from '../helpers/getMultisafeContract';

const getAddRequestTxs = async (multisafeId) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(`${config.backendURL}/getAddRequestTxs?${new URLSearchParams({
        multisafeId
    })}`, requestOptions);

    const body = await response.json();
    return body;
};

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

        try {
            const [balance, members, requestIds, numConfirmations, addRequestTxs] = await Promise.all([
                new Account(near.connection, multisafeId).getAccountBalance(),
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
            });
        } catch (e) {
            setError({ isError: true, description: e.message });
        }
    },
);
