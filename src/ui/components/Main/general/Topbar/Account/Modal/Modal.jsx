import { Button, Paper, Divider } from '@material-ui/core';
import { Near } from '@ui/components/general/icons/Near';
import { CopyToClipboard } from '@ui/components/Main/MultiSafe/general/CopyToClipboard/CopyToClipboard';
import { OpenInExplorer } from '@ui/components/Main/MultiSafe/general/OpenInExplorer/OpenInExplorer';
import { useStoreActions } from 'easy-peasy';
import { useHistory } from 'react-router-dom';

import { useWalletSelector } from '../../../../../../providers/WalletSelectorProvider/WalletSelectorProvider';
import { useStyles } from './Modal.styles';

export const Modal = ({ accountId }) => {
    const onDisconnect = useStoreActions((actions) => actions.general.onDisconnect);
    const history = useHistory();
    const classes = useStyles();
    const { selector } = useWalletSelector();
    
    const disconnect = async () => {
        onDisconnect({ history, selector });
    };

    return (
        <Paper className={classes.container} elevation={4}>
            <div className={classes.account}>
                <Near className={classes.nearIcon} />
                <span className={classes.accountId}>{accountId}</span>
                <div className={classes.tools}>
                    <CopyToClipboard accountId={accountId} />
                    <OpenInExplorer accountId={accountId} />
                </div>
            </div>
            <Divider />
            <div className={classes.footer}>
                <Button variant="outlined" className={classes.disconnect} onClick={disconnect}>
          Disconnect
                </Button>
            </div>
        </Paper>
    );
};
