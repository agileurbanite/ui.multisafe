import { Paper, Button } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Modal } from '../Modal/Modal';
import { Icon } from './Icon/Icon';
import { Near } from '../icons/Near';
import { Ledger } from '../icons/Ledger';
import { routes } from '../../../config/routes';
import { useStyles } from './ConnectWallet.styles';

export const ConnectWallet = ({ button }) => {
  const [isOpen, setOpen] = useState(false);
  const isConnected = useStoreState((s) => s.general.user.isConnected);
  const onConnectToWallet = useStoreActions((a) => a.general.onConnectToWallet);
  const { push } = useHistory();
  const classes = useStyles();

  // TODO it's a temporary solution until we will implement a redirect logic
  const onConnect = () => {
    isConnected ? push(routes.getStarted) : onConnectToWallet();
  };

  const onClose = () => setOpen(false);

  return (
    <Modal modal={{ className: classes.modal }} isOpen={isOpen} setOpen={setOpen} button={button}>
      <Paper className={classes.container}>
        <h2 className={classes.header}>Connect Wallet</h2>
        <p className={classes.description}>Please select a wallet to connect to Multi Safe</p>
        <div className={classes.icons}>
          <Icon onClick={onConnect} title="Near Wallet" icon={Near} />
          <Icon onClick={() => {}} title="Ledger" icon={Ledger} />
        </div>
        <div className={classes.footer}>
          <Button className={classes.cancel} onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Paper>
    </Modal>
  );
};
