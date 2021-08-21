import { Button } from '@material-ui/core';
import { Usb } from '@material-ui/icons';
import { Icon } from '../general/Icon/Icon';
import { useStyles } from './ConnectLedger.styles';

export const ConnectLedger = ({ onCloseModal }) => {
  const classes = useStyles();
  return (
    <>
      <h2 className={classes.header}>Connect Ledger</h2>
      <p className={classes.description}>
        Connect your Ledger to manage your multi safes in the most secure way
      </p>
      <div className={classes.icons}>
        <Icon onClick={() => {}} title="USB" icon={Usb} />
      </div>
      <div className={classes.footer}>
        <Button className={classes.cancel} onClick={onCloseModal}>
          Cancel
        </Button>
      </div>
    </>
  );
};
