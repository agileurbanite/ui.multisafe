import { Modal, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { routes } from '../../../config/routes';
import { useStyles } from './GetStartedModal.styles';

export const GetStartedModal = ({ isOpen, onClose }) => {
  const classes = useStyles();
  return (
    <Modal open={isOpen} onClose={onClose} className={classes.modal}>
      <Paper className={classes.container}>
        <Link to={routes.getStarted}>Start without connection with wallet</Link>
      </Paper>
    </Modal>
  );
};
