import { Footer } from '@ui/components/general/Footer/Footer';
import { routes } from '@ui/config/routes';
import { Loader } from '@ui/providers/Initializer/Loader/Loader';
import { useStoreActions } from 'easy-peasy';
import { useState } from 'react';
import { Switch, Route } from 'react-router';

import { Dashboard } from './Dashboard/Dashboard';
import { Disconnect } from './EditMultisafe/Disconnect';
import { EditSafe } from './EditMultisafe/EditSafe';
import { Remove } from './EditMultisafe/Remove';
import { History } from './History/History';
import { Members } from './Members/Members';
import { useStyles } from './MultiSafe.styles';
import { MultisafeList } from './MultisafeList/MultisafeList';
import { NonFungibleTokens } from './NonFungibleTokens/NonFungibleTokens';
import { Sidebar } from './Sidebar/Sidebar';

export const MultiSafe = () => {
    const [isListOpen, setListOpen] = useState(false);
    const onMountList = useStoreActions((actions) => actions.multisafe.onMountList);
    const classes = useStyles();

    const onListOpen = () => onMountList({ setListOpen });
    const onListClose = () => setListOpen(false);
    const onToggleList = () => (isListOpen ? onListClose() : onListOpen());

    return (
        <div className={classes.container}>
            <Sidebar onToggleList={onToggleList} />
            {isListOpen && <MultisafeList onListClose={onListClose} />}
            <div className={classes.content}>
                <Switch>
                    <Route exact path={routes.dashboard} component={Dashboard} />
                    <Route exact path={routes.history} component={History} />
                    <Route exact path={routes.members} component={Members} />
                    <Route exact path={routes.remove} component={Remove} />
                    <Route exact path={routes.disconnect} component={Disconnect} />
                    <Route exact path={routes.nonFungibleTokens} component={NonFungibleTokens} />
                    <Route exact path={routes.safeEdit} component={EditSafe} />
                    <Route exact path={routes.redirectFromWallet} component={Loader} />
                </Switch>
                <Footer />
            </div>
        </div>
    );
};
