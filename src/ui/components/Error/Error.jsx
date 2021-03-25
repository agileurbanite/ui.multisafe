import { Modal, Paper, Button } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useStyles } from './Error.styles';

export const Error = () => {
  const isError = useStoreState((store) => store.general.error.isError);
  const description = useStoreState((store) => store.general.error.description);
  const removeError = useStoreActions((actions) => actions.general.removeError);
  const classes = useStyles();

  if (!isError) return null;

  return (
    <Modal
      className={classes.modal}
      open={isError}
      onClose={removeError}
      BackdropProps={{ invisible: true }}>
      <Paper className={classes.container} elevation={5}>
        <h2 className={classes.header}>Ooops...</h2>
        <p>{description}</p>
        <div className={classes.footer}>
          <Button color="primary" className={classes.button} onClick={removeError}>
            Got It
          </Button>
        </div>
      </Paper>
    </Modal>
  );
};
