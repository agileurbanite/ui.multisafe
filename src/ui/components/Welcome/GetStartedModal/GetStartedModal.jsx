import { Modal, Paper, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Near } from '../../general/icons/Near';
import { Ledger } from '../../general/icons/Ledger';
import { routes } from '../../../config/routes';
import { useStyles } from './GetStartedModal.styles';

export const GetStartedModal = ({ isOpen, onClose }) => {
  const classes = useStyles();
  return (
    <Modal open={isOpen} onClose={onClose} className={classes.modal}>
      <Paper className={classes.container}>
        <IconButton>
          <div className={classes.iconWrapper}>
            <Near />
          </div>
        </IconButton>
        <IconButton>
          <div className={classes.iconWrapper}>
            <Ledger />
          </div>
        </IconButton>
        <Link to={routes.getStarted}>Start without connection with wallet</Link>
      </Paper>
    </Modal>
  );
};
