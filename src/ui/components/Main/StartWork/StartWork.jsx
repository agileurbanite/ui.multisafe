import { Switch, Route } from 'react-router-dom';

import { routes } from '../../../config/routes';
import { Footer } from '../../general/Footer/Footer';
import { CreateMultisafe } from './CreateMultisafe/CreateMultisafe';
import { GetStarted } from './GetStarted/GetStarted';
import { LoadMultisafe } from './LoadMultisafe/LoadMultisafe';
import { useStyles } from './StartWork.styles';

export const StartWork = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Switch>
                <Route exact path={routes.getStarted} component={GetStarted} />
                <Route exact path={routes.createMultisafe} component={CreateMultisafe} />
                <Route exact path={routes.loadMultisafe} component={LoadMultisafe} />
            </Switch>
            <Footer />
        </div>
    );
};
