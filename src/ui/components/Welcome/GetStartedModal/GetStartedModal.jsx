import { Modal, Paper, IconButton } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Near } from '../../general/icons/Near';
import { Ledger } from '../../general/icons/Ledger';
import { routes } from '../../../config/routes';
import { useStyles } from './GetStartedModal.styles';

export const GetStartedModal = ({ isOpen, onClose }) => {
  const isConnected = useStoreState((s) => s.general.user.isConnected);
  const onConnectToWallet = useStoreActions((a) => a.general.onConnectToWallet);
  const { push } = useHistory();
  const classes = useStyles();

  // TODO it's a temporary solution until we will implement a redirect logic
  const onConnect = () => {
    isConnected ? push(routes.getStarted) : onConnectToWallet();
  };

  // TODO move IconButton to separate component
  return (
    <Modal open={isOpen} onClose={onClose} className={classes.modal}>
      <Paper className={classes.container}>
        <div className={classes.buttonWrapper}>
          <IconButton onClick={onConnect}>
            <div className={classes.iconWrapper}>
              <Near />
            </div>
          </IconButton>
          <span>Near Wallet</span>
        </div>
        <div className={classes.buttonWrapper}>
          <IconButton>
            <div className={classes.iconWrapper}>
              <Ledger />
            </div>
          </IconButton>
          <span>Ledger</span>
        </div>
        <Link to={routes.getStarted}>Start without connection with wallet</Link>
      </Paper>
    </Modal>
  );
};
