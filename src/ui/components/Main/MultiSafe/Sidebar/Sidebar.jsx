import {useStoreState} from "easy-peasy";
import { Divider } from '@material-ui/core';
import { Account } from './Account/Account';
import { Actions } from './Actions/Actions';
import { Navigation } from './Navigation/Navigation';
import { useStyles } from './Sidebar.styles';


export const Sidebar = ({ onToggleList }) => {
  const isMobileMenuOpen = useStoreState((store) => store.general.isMobileMenuOpen);
  const classes = useStyles();

  const wrapperCLasses = [classes.container];
  if(isMobileMenuOpen){
    wrapperCLasses.push(classes.active);
  }

  return (
    <div className={wrapperCLasses.join(' ')}>
      <Account onToggleList={onToggleList} />
      <Actions />
      <Divider className={classes.divider} />
      <Navigation />
    </div>
  );
};
