import { Button, Paper, Modal } from '@material-ui/core';
import { useStoreActions } from 'easy-peasy';
import { useStyles } from './RemoveModal.styles';

export const RemoveModal = ({
  isOpenRemoveModal,
  closeRemoveModal,
  stopPropagation,
  multisafeId,
  name,
}) => {
  const removeMultisafe = useStoreActions((actions) => actions.multisafe.removeMultisafe);
  const classes = useStyles();

  const onRemoveMultisafe = () => removeMultisafe(multisafeId);

  return (
    <Modal
      onClick={stopPropagation}
      open={isOpenRemoveModal}
      onClose={closeRemoveModal}
      className={classes.modal}
    >
      <Paper className={classes.container}>
        <div className={classes.wrapper}>
          <h2 className={classes.header}>Remove multisafe</h2>
          <div className={classes.adornmentText}>
            {`Are you sure to remove "${name}" from list?
           Notice that it is be removed only locally
           from your browser - you won't delete it from
           the blockchain.`}
          </div>
          <div className={classes.footer}>
            <Button onClick={closeRemoveModal} className={classes.cancel}>
              Cancel
            </Button>
            <Button color="secondary" onClick={onRemoveMultisafe}>
              Remove
            </Button>
          </div>
        </div>
      </Paper>
    </Modal>
  );
};
