import { Paper, Divider, IconButton, ClickAwayListener } from '@material-ui/core';
import { Add, SystemUpdateAlt, Close } from '@material-ui/icons';
import { GreenLink } from '@ui/components/Main/general/GreenLink/GreenLink';
import { routes } from '@ui/config/routes';
import { useWalletSelector } from '@ui/providers/WalletSelectorProvider/WalletSelectorProvider';
import { useStoreState } from 'easy-peasy';

import { List } from './List/List';
import { useStyles } from './MultisafeList.styles';

export const MultisafeList = ({ onListClose }) => {
    const { selector } = useWalletSelector();
    const isConnected = selector.isSignedIn();
    const membership = useStoreState((store) => store.multisafe.selectors.multisafes.membership);
    const readOnly = useStoreState((store) => store.multisafe.selectors.multisafes.readOnly);
    const classes = useStyles();

    return (
        <ClickAwayListener onClickAway={onListClose}>
            <Paper className={classes.container} elevation={5} square>
                <div className={classes.topbar}>
                    <div className={classes.arrow} />
                    <IconButton onClick={onListClose}>
                        <Close className={classes.topbarIcon} />
                    </IconButton>
                    <h3 className={classes.header}>Multi Safe List</h3>
                </div>
                <Divider className={classes.divider} />
                <GreenLink
                    to={routes.createMultisafe}
                    text="Create new Multi Safe"
                    icon={Add}
                    disabled={!isConnected}
                />
                <GreenLink
                    to={routes.loadMultisafe}
                    text="Load existing Multi Safe"
                    icon={SystemUpdateAlt}
                />
                <List multisafes={membership} title="Membership" onListClose={onListClose} />
                <List multisafes={readOnly} title="Read Only" onListClose={onListClose} />
            </Paper>
        </ClickAwayListener>
    );
};
