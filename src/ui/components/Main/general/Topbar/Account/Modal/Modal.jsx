import { Button, Paper, Divider } from '@material-ui/core';
import { useStoreActions } from 'easy-peasy';
import { useHistory } from 'react-router-dom';

import { Near } from '../../../../../general/icons/Near';
import { CopyToClipboard } from '../../../../MultiSafe/general/CopyToClipboard/CopyToClipboard';
import { OpenInExplorer } from '../../../../MultiSafe/general/OpenInExplorer/OpenInExplorer';
import { useStyles } from './Modal.styles';

export const Modal = ({ accountId }) => {
    const onDisconnect = useStoreActions((actions) => actions.general.onDisconnect);
    const history = useHistory();
    const classes = useStyles();

    const disconnect = () => onDisconnect({ history });

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
