import { useStoreState } from 'easy-peasy';
import { useStyles } from './Topbar.styles';
import logo from '../../../../images/logo/logo-black@3x.png';

export const Topbar = () => {
  const isConnected = useStoreState((s) => s.general.user.isConnected);
  const accountId = useStoreState((s) => s.general.user.accountId);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <img className={classes.logo} src={logo} alt="Logo of Multisafe" />
      {isConnected ? <span>{accountId}</span> : <span>Connect to wallet</span>}
    </div>
  );
};
