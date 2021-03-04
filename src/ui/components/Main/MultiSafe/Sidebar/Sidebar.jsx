import { Divider } from '@material-ui/core';
import { Account } from './Account/Account';
import { Actions } from './Actions/Actions';
import { Navigation } from './Navigation/Navigation';
import { useStyles } from './Sidebar.styles';

export const Sidebar = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Account />
      <Actions />
      <Divider className={classes.divider} />
      <Navigation />
    </div>
  );
};
