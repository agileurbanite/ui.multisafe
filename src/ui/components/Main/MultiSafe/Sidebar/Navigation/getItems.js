import { Dashboard, People, Settings, PhotoLibrary } from '@material-ui/icons';
import { routes, getRoute } from '@ui/config/routes';

const items = [
    {
        name: 'Requests',
        route: routes.dashboard,
        getPath: getRoute.dashboard,
        icon: Dashboard,
        subItems: [
            {
                name: 'Pending',
                route: routes.dashboard,
                getPath: getRoute.dashboard
            },
            {
                name: 'Completed',
                route: routes.history,
                getPath: getRoute.history
            }]
    },
    {
        name: 'Members',
        route: routes.members,
        getPath: getRoute.members,
        icon: People
    },
    {
        name: 'Settings',
        route: routes.safeEdit,
        getPath: getRoute.safeEdit,
        icon: Settings,
        subItems: [{
            name: 'Edit Safe',
            route: routes.safeEdit,
            getPath: getRoute.safeEdit
        }, {
            name: 'Remove Multi Safe',
            route: routes.remove,
            getPath: getRoute.remove
        }, {
            name: 'Disconnect Account',
            route: routes.disconnect,
            getPath: getRoute.disconnect
        }]
    },
    {
        name: 'Collectibles',
        route: routes.nonFungibleTokens,
        getPath: getRoute.nonFungibleTokens,
        icon: PhotoLibrary
    },
];

export const getItems = (match) =>
    items.map(({ name, icon, getPath, route, subItems }) => ({
        name,
        icon,
        path: getPath(match.params.multisafeId),
        isActive: subItems?.length
            ? subItems.some((subItem) => match.path === subItem.route)
            : route === match.path,
        subItems: subItems?.map((subItem) => ({
            name: subItem.name,
            path: subItem.getPath(match.params.multisafeId),
            isActive: subItem.route === match.path,
        }))
    }));
