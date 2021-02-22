import { Switch, Route } from 'react-router-dom';
import { Footer } from '../../general/Footer/Footer';
import { GetStarted } from './GetStarted/GetStarted';
import { CreateMultiSafe } from './CreateMultiSafe/CreateMultiSafe';
import { routes } from '../../../config/routes';
import { useStyles } from './StartWork.styles';

export const StartWork = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Switch>
        <Route exact path={routes.getStarted} component={GetStarted} />
        <Route exact path={routes.createMultiSafe} component={CreateMultiSafe} />
      </Switch>
      <Footer />
    </div>
  );
};
