import { Paper, Modal } from '@material-ui/core';
import { useState } from 'react';
import { ChooseWallet } from './ChooseWallet/ChooseWallet';
import { ConnectLedger } from './ConnectLedger/ConnectLedger';
import { useStyles } from './ConnectWallet.styles';

export const ConnectWallet = ({ setModalOpen }) => {
  const [step, setStep] = useState(1);
  const classes = useStyles();

  const onCloseModal = () => setModalOpen(false);

  return (
    <Modal className={classes.modal} open onClose={onCloseModal}>
      <Paper className={classes.container}>
        <div className={classes.wrapper}>
          {step === 1 && <ChooseWallet onCloseModal={onCloseModal} setStep={setStep} />}
          {step === 2 && <ConnectLedger onCloseModal={onCloseModal} setStep={setStep} />}
        </div>
      </Paper>
    </Modal>
  );
};
