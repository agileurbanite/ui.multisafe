import { Switch, Route } from 'react-router-dom';
import { Welcome } from './Welcome/Welcome';
import { Main } from './Main/Main';
import { PageNotFound } from './PageNotFound/PageNotFound';
import { Error } from './Error/Error';
import { routes } from '../config/routes';

export const App = () => (
  <>
    <Switch>
      <Route exact path={routes.welcome} component={Welcome} />
      <Route
        exact
        path={[
          routes.getStarted,
          routes.createMultisafe,
          routes.loadMultisafe,
          routes.dashboard,
          routes.members,
        ]}
        component={Main}
      />
      <Route path="*" component={PageNotFound} />
    </Switch>
    <Error />
  </>
);
