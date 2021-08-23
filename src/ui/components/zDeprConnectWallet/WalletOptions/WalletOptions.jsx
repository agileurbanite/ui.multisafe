import { useStoreActions } from 'easy-peasy';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Icon } from './Icon/Icon';
import { Ledger } from '../../general/icons/Ledger';
import { Near } from '../../general/icons/Near';
import { routes } from '../../../config/routes';
import { useStyles } from './WalletOptions.styles';

export const WalletOptions = () => {
  const onConnectNearWallet = useStoreActions((a) => a.general.onConnectNearWallet);
  const history = useHistory();
  const classes = useStyles();

  const goToConnectLedger = () => history.replace(routes.connectLedger);
  const goToGetStarted = () => history.replace(routes.getStarted);

  return (
    <div className={classes.container}>
      <h2 className={classes.header}>Connect Wallet</h2>
      <p className={classes.description}>
        Please connect your wallet to use all the features of Multi Safe
      </p>
      <div className={classes.icons}>
        <Icon onClick={onConnectNearWallet} title="Near Wallet" icon={Near} />
        <Icon onClick={goToConnectLedger} title="Ledger" icon={Ledger} />
      </div>
      <p>OR</p>
      <p>Do not have an account or want to take a quick look at Multisafe?</p>
      <Button variant="contained" color="primary" onClick={goToGetStarted}>
        Try Demo
      </Button>
    </div>
  );
};
