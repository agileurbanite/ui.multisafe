import { useStoreActions } from 'easy-peasy';
import { useState } from 'react';
import { Switch, Route } from 'react-router';
import { Footer } from '../../general/Footer/Footer';
import { Sidebar } from './Sidebar/Sidebar';
import { MultisafeList } from './MultisafeList/MultisafeList';
import { Dashboard } from './Dashboard/Dashboard';
import { History } from './History/History';
import { Members } from './Members/Members';
import { routes } from '../../../config/routes';
import { useStyles } from './MultiSafe.styles';
import { EditMembers } from './EditMultisafe/EditMembers';
import { EditConfirmations } from './EditMultisafe/EditConfirmations';
import { EditName } from './EditMultisafe/EditName';
import { Remove } from './EditMultisafe/Remove';
import { Disconnect } from './EditMultisafe/Disconnect';

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
          <Route exact path={routes.membersEdit} component={EditMembers} />
          <Route exact path={routes.numberConfirmations} component={EditConfirmations} />
          <Route exact path={routes.editName} component={EditName} />
          <Route exact path={routes.remove} component={Remove} />
          <Route exact path={routes.disconnect} component={Disconnect} />
        </Switch>
        <Footer />
      </div>
    </div>
  );
};
