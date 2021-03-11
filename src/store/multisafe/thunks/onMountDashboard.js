import { thunk } from 'easy-peasy';

export const onMountDashboard = thunk(async (_, __, { getStoreState, getStoreActions }) => {
  const store = getStoreState();
  const accountId = store.general.user.accountId;
  const contract = store.multisafe.entities.contract;
  const actions = getStoreActions();
  const mountDashboard = actions.multisafe.mountDashboard;

  try {
    const [requestIds, numConfirmations] = await Promise.all([
      contract.list_request_ids(),
      contract.get_num_confirmations(),
    ]);

    const requests = await Promise.all(
      requestIds.map((request_id) =>
        Promise.all([
          contract.get_request({ request_id }),
          contract.get_confirmations({ request_id }),
        ]),
      ),
    );

    mountDashboard({ requests, requestIds, accountId, numConfirmations });
  } catch (e) {
    throw new Error(e);
  }
});
