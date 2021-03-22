import { ExitToApp, DeleteOutline } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useHistory } from 'react-router-dom';
import { ConnectWallet } from '../../../../general/ConnectWallet/ConnectWallet';
import { useStyles } from './NonConnected.styles';

export const NonConnected = () => {
  const hasSavedMultisafes = useStoreState((store) => store.general.selectors.hasSavedMultisafes);
  const onDisconnect = useStoreActions((actions) => actions.general.onDisconnect);
  const history = useHistory();
  const classes = useStyles();

  const disconnect = () => onDisconnect({ history });

  return (
    <div>
      {hasSavedMultisafes && (
        <Button
          className={classes.clearDataButton}
          variant="outlined"
          color="secondary"
          onClick={disconnect}>
          <DeleteOutline />
          <span>Clear local data</span>
        </Button>
      )}
      <ConnectWallet
        button={{
          content: (
            <span className={classes.buttonContent}>
              <ExitToApp />
              <span>Connect wallet</span>
            </span>
          ),
          className: classes.connectWalletButton,
          variant: 'outlined',
          color: 'primary',
        }}
      />
    </div>
  );
};
