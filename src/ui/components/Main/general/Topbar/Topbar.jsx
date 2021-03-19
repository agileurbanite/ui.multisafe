import { useStoreState } from 'easy-peasy';
import { LinearProgress } from '@material-ui/core';
import { Account } from './Account/Account';
import { NonConnected } from './NonConnected/NonConnected';
import { useStyles } from './Topbar.styles';
import logo from '../../../../images/logo/logo-black@3x.png';

export const Topbar = () => {
  const isConnected = useStoreState((store) => store.general.user.isConnected);
  const isLoading = useStoreState((store) => store.general.isLoading);
  const accountId = useStoreState((store) => store.general.user.accountId);
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <img className={classes.logo} src={logo} alt="Logo of Multisafe" />
        {isConnected ? <Account accountId={accountId} /> : <NonConnected />}
      </div>
      {isLoading && <LinearProgress className={classes.progress} />}
    </>
  );
};
