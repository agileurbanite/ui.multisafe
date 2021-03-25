import { Modal, Paper } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useStyles } from './Error.styles';

export const Error = () => {
  const isError = useStoreState((store) => store.general.error.isError);
  const description = useStoreState((store) => store.general.error.description);
  const removeError = useStoreActions((actions) => actions.general.removeError);
  const classes = useStyles();

  if (!isError) return null;

  return (
    <Modal className={classes.modal} open={isError} onClose={removeError}>
      <Paper className={classes.container}>
        <h1>{description}</h1>
      </Paper>
    </Modal>
  );
};
