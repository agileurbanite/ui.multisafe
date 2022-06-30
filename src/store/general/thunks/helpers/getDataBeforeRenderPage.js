import { matchPath } from 'react-router';

import { routes } from '../../../../ui/config/routes';

const { 
    createMultisafe,
    dashboard,
    history,
    members,
    remove,
    disconnect,
    nonFungibleTokens,
    safeEdit
} = routes;

export const getDataBeforeRenderPage = async ({
    actions,
    history: browserHistory,
    withLoading,
}) => {
    const enableLoading = actions.general.enableLoading;
    const disableLoading = actions.general.disableLoading;
    const onMountMultisafe = actions.multisafe.onMountMultisafe;
    const onMountDashboard = actions.multisafe.onMountDashboard;
    const onMountHistory = actions.multisafe.onMountHistory;
    const onMountTokenList = actions.multisafe.onMountTokenList;
    const onMountNonFungibleTokenList = actions.multisafe.onMountNonFungibleTokenList;

    const match = matchPath(browserHistory.location.pathname, [
        createMultisafe,
        dashboard,
        history,
        members,
        remove,
        disconnect,
        nonFungibleTokens,
        safeEdit
    ]);

    if (!match) return;

    const { multisafeId } = match?.params;
    const ifRouteIs = (route) => route === match.path;

    withLoading && enableLoading();

    if (ifRouteIs(dashboard)) {
        await onMountDashboard(multisafeId);
        await onMountTokenList(multisafeId);
    }

    if (ifRouteIs(history)) {
        await onMountMultisafe({ multisafeId });
        await onMountHistory();
    }

    if (ifRouteIs(members)) {
        await onMountMultisafe({ multisafeId });
    }

    // if (ifRouteIs(membersEdit)) {
    //     await onMountMultisafe({ multisafeId });
    // }

    // if (ifRouteIs(numberConfirmations)) {
    //     await onMountMultisafe({ multisafeId });
    // }

    // if (ifRouteIs(editName)) {
    //     await onMountMultisafe({ multisafeId });
    // }

    if (ifRouteIs(remove)) {
        await onMountMultisafe({ multisafeId });
    }

    if (ifRouteIs(disconnect)) {
        await onMountMultisafe({ multisafeId });
    }
  
    if (ifRouteIs(nonFungibleTokens)) {
        await onMountDashboard(multisafeId);
        await onMountNonFungibleTokenList(multisafeId);
    }

    if (ifRouteIs(safeEdit)) {
        await onMountMultisafe({ multisafeId });
    }

    withLoading && disableLoading();
};
