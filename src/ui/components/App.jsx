import { Switch, Route, Redirect } from 'react-router-dom';
import { Welcome } from './Welcome/Welcome';
import { StartWork } from './StartWork/StartWork';
import { routes } from '../config/routes';

export const App = () => (
  <Switch>
    <Redirect exact from={routes.root} to={routes.welcome} />
    <Route exact path={routes.welcome} component={Welcome} />
    <Route exact path={[routes.getStarted, routes.createMultisafe]} component={StartWork} />
  </Switch>
);
