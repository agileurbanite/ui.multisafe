import { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Welcome } from './Welcome/Welcome';
import { Main } from './Main/Main';
import { routes } from '../config/routes';

export const App = () => {
  const isAppInitialized = useStoreState((s) => s.general.isAppInitialized);
  const onInitApp = useStoreActions((a) => a.general.onInitApp);

  useEffect(() => {
    onInitApp();
  }, [onInitApp]);

  if (!isAppInitialized) return null;
  return (
    <Switch>
      <Redirect exact from={routes.root} to={routes.welcome} />
      <Route exact path={routes.welcome} component={Welcome} />
      <Route
        exact
        path={[routes.getStarted, routes.createMultiSafe, routes.loadMultisafe, routes.dashboard]}
        component={Main}
      />
    </Switch>
  );
};
