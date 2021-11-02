import { Dashboard, People, History } from '@material-ui/icons';
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
];

export const getItems = (match) =>
  items.map(({ name, icon, getPath, route }) => ({
    name,
    icon,
    path: getPath(match.params.multisafeId),
    isActive: route === match.path,
  }));
