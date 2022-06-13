import { Dashboard, People, History, Settings } from '@material-ui/icons';
import { routes, getRoute } from '../../../../../config/routes';

const items = [
  {
    name: 'Dashboard',
    route: routes.dashboard,
    getPath: getRoute.dashboard,
    icon: Dashboard,
  },
  {
    name: 'History',
    route: routes.history,
    getPath: getRoute.history,
    icon: History,
  },
  {
    name: 'Members',
    route: routes.members,
    getPath: getRoute.members,
    icon: People,
  },
  {
    name: 'Settings',
    route: routes.membersEdit,
    getPath: getRoute.membersEdit,
    icon: Settings,
    subItems: [{
      name: 'Edit Members',
      route: routes.membersEdit,
      getPath: getRoute.membersEdit,
    }, {
      name: 'Edit Confirmations Num',
      route: routes.numberConfirmations,
      getPath: getRoute.numberConfirmations,
    }, {
      name: 'Edit Name',
      route: routes.editName,
      getPath: getRoute.editName,
    }, {
      name: 'Remove Multi Safe',
      route: routes.remove,
      getPath: getRoute.remove,
    }, {
      name: 'Disconnect',
      route: routes.disconnect,
      getPath: getRoute.disconnect,
    }]
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
