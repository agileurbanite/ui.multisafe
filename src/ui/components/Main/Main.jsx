import { Route, Switch } from 'react-router-dom';
import { Topbar } from './general/Topbar/Topbar';
import { MultiSafe } from './MultiSafe/MultiSafe';
import { StartWork } from './StartWork/StartWork';
import { routes } from '../../config/routes';

export const Main = () => (
  <>
    <Topbar />
    <Switch>
      <Route
        exact
        path={[
          routes.getStarted,
          routes.createMultisafe,
          routes.loadMultisafe
        ]}
        component={StartWork}
      />
      <Route
        exact
        path={[
          routes.dashboard,
          routes.history,
          routes.members,
          routes.membersEdit,
          routes.numberConfirmations,
          routes.editName,
          routes.remove,
        ]}
        component={MultiSafe}
      />
    </Switch>
  </>
);
