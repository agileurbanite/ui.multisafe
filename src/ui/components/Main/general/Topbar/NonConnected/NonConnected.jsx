import { Button } from '@material-ui/core';
import { ExitToApp, DeleteOutline } from '@material-ui/icons';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useHistory } from 'react-router-dom';

import { useWalletSelector } from '../../../../../providers/WalletSelectorProvider/WalletSelectorProvider';
import { useStyles } from './NonConnected.styles';

export const NonConnected = () => {
    const hasSavedMultisafes = useStoreState((store) => store.general.selectors.hasSavedMultisafes);
    const onDisconnect = useStoreActions((actions) => actions.general.onDisconnect);
    const history = useHistory();
    const classes = useStyles();

    const { selector, modal } = useWalletSelector();

    const disconnect = async () => {
        await onDisconnect({ history, selector });
    };

    const openConnectWallet = () => modal.show();

    return (
        <>
            <div>
                {hasSavedMultisafes && (
                    <Button
                        className={classes.clearDataButton}
                        variant="outlined"
                        color="secondary"
                        onClick={disconnect}
                    >
                        <DeleteOutline />
                        <span>Clear local data</span>
                    </Button>
                )}
                <Button
                    onClick={openConnectWallet}
                    className={classes.connectWalletButton}
                    variant="outlined"
                    color="primary"
                >
                    <span className={classes.buttonContent}>
                        <ExitToApp />
                        <span>Connect wallet</span>
                    </span>
                </Button>
            </div>
        </>
    );
};
