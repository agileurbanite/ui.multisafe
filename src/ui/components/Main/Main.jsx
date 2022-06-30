import { Route, Switch } from 'react-router-dom';

import { routes } from '../../config/routes';
import { Topbar } from './general/Topbar/Topbar';
import { MultiSafe } from './MultiSafe/MultiSafe';
import { StartWork } from './StartWork/StartWork';

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
                    routes.remove,
                    routes.disconnect,
                    routes.nonFungibleTokens,
                    routes.safeEdit,
                    routes.redirectFromWallet
                ]}
                component={MultiSafe}
            />
        </Switch>
    </>
);
