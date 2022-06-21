import { Switch, Route } from 'react-router-dom';

import { routes } from '../config/routes';
import { ConfirmActionOnLedger } from './ConfirmActionOnLedger/ConfirmActionOnLedger';
import { Error } from './Error/Error';
import { Main } from './Main/Main';
import { PageNotFound } from './PageNotFound/PageNotFound';
import { SelectLedgerAccount } from './SelectLedgerAccount/SelectLedgerAccount';
import { Welcome } from './Welcome/Welcome';

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
                    routes.history,
                    routes.members,
                    routes.membersEdit,
                    routes.numberConfirmations,
                    routes.editName,
                    routes.remove,
                    routes.disconnect,
                    routes.nonFungibleTokens,
                ]}
                component={Main}
            />
            <Route path="*" component={PageNotFound} />
        </Switch>
        <Error />
        <ConfirmActionOnLedger />
        <SelectLedgerAccount />
    </>
);
