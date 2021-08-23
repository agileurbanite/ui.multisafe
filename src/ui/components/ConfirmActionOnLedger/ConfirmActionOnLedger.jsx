import { Paper, Modal } from '@material-ui/core';
import { useStyles } from './ConfirmActionOnLedger.styles';
import ledgerDevice from '../../images/ledger-device.png';

export const ConfirmActionOnLedger = () => {
  const classes = useStyles();
  const isOpen = false;

  if (!isOpen) return null;

  return (
    <Modal className={classes.modal} open onClose={() => {}}>
      <Paper className={classes.container}>
        <div className={classes.wrapper}>
          Confirm the action on your Ledger
          <img src={ledgerDevice} alt="ledger device" className={classes.ledgerDeviceImage} />
        </div>
      </Paper>
    </Modal>
  );
};
