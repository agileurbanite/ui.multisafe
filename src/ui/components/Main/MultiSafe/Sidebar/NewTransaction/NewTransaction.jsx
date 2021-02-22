import { Button, Modal, Paper } from '@material-ui/core';
import { useState } from 'react';
import { useStyles } from './NewTransaction.styles';

// TODO Create Modal as a general component
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
        <Paper className={classes.container}>Send Funds</Paper>
      </Modal>
    </>
  );
};
