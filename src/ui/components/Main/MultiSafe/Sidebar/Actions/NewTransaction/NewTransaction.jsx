import { useState } from 'react';
import { Button, Modal } from '@material-ui/core';
import { SendFunds } from './SendFunds/SendFunds';
import { useStyles } from './NewTransaction.styles';

// TODO Create Popover as a general component
export const NewTransaction = () => {
  const [isOpen, setOpen] = useState(false);
  const classes = useStyles();

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={onOpen} variant="contained" color="primary" className={classes.button}>
        New Transaction
      </Button>
      <Modal open={isOpen} onClose={onClose} className={classes.modal}>
        <SendFunds onClose={onClose} />
      </Modal>
    </>
  );
};
