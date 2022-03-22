import {useStoreActions, useStoreState} from 'easy-peasy';
import { LinearProgress } from '@material-ui/core';
import { Account } from './Account/Account';
import { NonConnected } from './NonConnected/NonConnected';
import { useStyles } from './Topbar.styles';
import logo from '../../../../images/logo/logo-black.svg';

export const Topbar = () => {
  const isConnected = useStoreState((store) => store.general.user.isConnected);
  const isLoading = useStoreState((store) => store.general.isLoading);
  const accountId = useStoreState((store) => store.general.user.accountId);
  const isMobileMenuOpen = useStoreState((store) => store.general.isMobileMenuOpen);
  const onMobileMenuClick = useStoreActions((actions) => actions.general.onMobileMenuClick);
  const classes = useStyles();

  const mobileMenuButtonClasses = [classes.menu_toggle];
  if(isMobileMenuOpen){
    mobileMenuButtonClasses.push(classes.menu_toggle_active);
  }

  return (
    <>
      <div className={classes.container}>
          <button type="button" className={mobileMenuButtonClasses.join(' ')} title="Click to open mobile nav" onClick={onMobileMenuClick}>
              <span />
              <span />
              <span />
          </button>
        <img className={classes.logo} src={logo} alt="Logo of Multisafe" />
        {isConnected ? <Account accountId={accountId} /> : <NonConnected />}
      </div>
      {isLoading && <LinearProgress className={classes.progress} />}
    </>
  );
};
