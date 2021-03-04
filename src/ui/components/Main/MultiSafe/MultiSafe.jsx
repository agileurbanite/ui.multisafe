import { Switch, Route } from 'react-router';
import { Sidebar } from './Sidebar/Sidebar';
import { Dashboard } from './Dashboard/Dashboard';
import { Members } from './Members/Members';
import { routes } from '../../../config/routes';
import { useStyles } from './MultiSafe.styles';

export const MultiSafe = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Sidebar />
      <div className={classes.content}>
        <Switch>
          <Route exact path={routes.dashboard} component={Dashboard} />
          <Route exact path={routes.members} component={Members} />
        </Switch>
      </div>
    </div>
  );
};
