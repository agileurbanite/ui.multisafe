import { useStoreActions } from 'easy-peasy';
import { useState } from 'react';
import { Switch, Route } from 'react-router';
import { Sidebar } from './Sidebar/Sidebar';
import { MultisafeList } from './MultisafeList/MultisafeList';
import { Dashboard } from './Dashboard/Dashboard';
import { Members } from './Members/Members';
import { routes } from '../../../config/routes';
import { useStyles } from './MultiSafe.styles';

export const MultiSafe = () => {
  const [isListOpen, setListOpen] = useState(true);
  const onMountList = useStoreActions((a) => a.multisafe.onMountList);
  const classes = useStyles();

  const onListOpen = () => onMountList({ setListOpen });
  const onListClose = () => setListOpen(false);
  const onToggleList = () => (isListOpen ? onListClose() : onListOpen());

  return (
    <div className={classes.container}>
      <Sidebar onToggleList={onToggleList} />
      <MultisafeList onListClose={onListClose} isListOpen={isListOpen} />
      <div className={classes.content}>
        <Switch>
          <Route exact path={routes.dashboard} component={Dashboard} />
          <Route exact path={routes.members} component={Members} />
        </Switch>
      </div>
    </div>
  );
};
