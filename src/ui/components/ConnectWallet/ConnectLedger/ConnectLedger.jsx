import { Button } from '@material-ui/core';
import { useStoreActions } from 'easy-peasy';
import { useHistory } from 'react-router-dom';
import { routes } from '../../../config/routes';
import { useStyles } from './ConnectLedger.styles';

export const ConnectLedger = () => {
  const onConnectLedgerViaUsb = useStoreActions(
    (actions) => actions.connectWallet.onConnectLedgerViaUsb,
  );
  const history = useHistory();
  const classes = useStyles();

  const goToConnectWallet = () => history.replace(routes.connectWallet);
  const connectLedgerViaUsb = () => onConnectLedgerViaUsb({ history });

  return (
    <div className={classes.container}>
      <h1>Connect Ledger</h1>
      <p>Be sure you connected your ledger</p>
      <Button variant="contained" color="primary" onClick={connectLedgerViaUsb}>
        Connect via USB
      </Button>
      <Button variant="contained" color="primary" onClick={goToConnectWallet}>
        Back
      </Button>
    </div>
  );
};
