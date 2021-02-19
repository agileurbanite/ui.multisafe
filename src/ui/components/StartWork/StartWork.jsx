import { Switch, Route } from 'react-router-dom';
import { routes } from '../../config/routes';
import { Topbar } from '../general/Topbar/Topbar';
import { GetStarted } from './GetStarted/GetStarted';
import { CreateMultisafe } from './CreateMultisafe/CreateMultisafe';
import { Footer } from '../general/Footer/Footer';
import { useStyles } from './StartWork.styles';

export const StartWork = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Topbar />
        <div className={classes.contentWrapper}>
          <Switch>
            <Route exact path={routes.getStarted} component={GetStarted} />
            <Route exact path={routes.createMultisafe} component={CreateMultisafe} />
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
};
