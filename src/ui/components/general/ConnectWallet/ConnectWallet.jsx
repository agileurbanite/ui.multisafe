import { Paper, Button } from '@material-ui/core';
import { useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import { Modal } from '../Modal/Modal';
import { Icon } from './Icon/Icon';
import { Near } from '../icons/Near';
import { useStyles } from './ConnectWallet.styles';

export const ConnectWallet = ({ button }) => {
  const [isOpen, setOpen] = useState(false);
  const onConnectToWallet = useStoreActions((a) => a.general.onConnectToWallet);
  const classes = useStyles();

  const onClose = () => setOpen(false);

  return (
    <Modal modal={{ className: classes.modal }} isOpen={isOpen} setOpen={setOpen} button={button}>
      <Paper className={classes.container}>
        <h2 className={classes.header}>Connect Wallet</h2>
        <p className={classes.description}>
          Please connect your wallet to use all the features of Multi Safe
        </p>
        <div className={classes.icons}>
          <Icon onClick={onConnectToWallet} title="Near Wallet" icon={Near} />
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
