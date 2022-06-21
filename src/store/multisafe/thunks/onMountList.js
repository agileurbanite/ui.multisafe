import { thunk } from 'easy-peasy';

export const onMountList = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
    const { setListOpen } = payload;
    const store = getStoreState();
    const near = store.general.entities.near;
    const multisafes = store.multisafe.multisafes;

    const actions = getStoreActions();
    const enableLoading = actions.general.enableLoading;
    const disableLoading = actions.general.disableLoading;
    const mountList = actions.multisafe.mountList;

    enableLoading();

    try {
        const accounts = await Promise.all(
            multisafes.map(({ multisafeId }) => near.account(multisafeId)),
        );

        const data = await Promise.all(
            accounts.map((account) =>
                Promise.all([
                    account.getAccountBalance(),
                    account.viewFunction(account.accountId, 'get_members'),
                ]),
            ),
        );

        mountList({ data });
        setListOpen(true);
    } catch (e) {
        actions.general.setError({ isError: true, description: e.message });
    }

    disableLoading();
});
