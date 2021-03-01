import { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Loader } from './Loader/Loader';
import { Welcome } from './Welcome/Welcome';
import { Main } from './Main/Main';
import { PageNotFound } from './PageNotFound/PageNotFound';
import { routes } from '../config/routes';

export const App = () => {
  const isAppInitialized = useStoreState((s) => s.general.isAppInitialized);
  const onInitApp = useStoreActions((a) => a.general.onInitApp);
  const history = useHistory();

  useEffect(() => {
    onInitApp({ history });
  }, [onInitApp, history]);

  if (!isAppInitialized) return <Loader />;

  return (
    <Switch>
      <Route exact path={routes.welcome} component={Welcome} />
      <Route
        exact
        path={[routes.getStarted, routes.createMultisafe, routes.loadMultisafe, routes.dashboard]}
        component={Main}
      />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
};
