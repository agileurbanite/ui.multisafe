import { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Button, Modal } from '@material-ui/core';
import { SendFunds } from './SendFunds/SendFunds';
import { useStyles } from './NewTransaction.styles';

// TODO Create Modal as a general component
export const NewTransaction = () => {
  const multisafeId = useStoreState((s) => s.multisafe.general.multisafeId);
  const fetchFungibleTokens = useStoreActions((actions) => actions.multisafe.onMountTokenList);
  const [isOpen, setOpen] = useState(false);
  const classes = useStyles();

  const onOpen = () => {
    fetchFungibleTokens(multisafeId);
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
