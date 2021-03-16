import { useStoreState } from 'easy-peasy';
import { LinearProgress } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { Account } from './Account/Account';
import { ConnectWallet } from '../../../general/ConnectWallet/ConnectWallet';
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
        {isConnected ? (
          <Account accountId={accountId} />
        ) : (
          <ConnectWallet
            button={{
              content: (
                <span className={classes.buttonContent}>
                  <ExitToApp />
                  <span>Connect wallet</span>
                </span>
              ),
              className: classes.connectWallet,
              variant: 'outlined',
              color: 'primary',
            }}
          />
        )}
      </div>
      {isLoading && <LinearProgress className={classes.progress} />}
    </>
  );
};
