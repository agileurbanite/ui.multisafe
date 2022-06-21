import { Button } from '@material-ui/core';
import { Usb } from '@material-ui/icons';
import { useStoreActions } from 'easy-peasy';

import { Icon } from '../general/Icon/Icon';
import { useStyles } from './ConnectLedger.styles';
import { getWebHIDSupportStatus } from './getWebHIDSupportStatus';

export const ConnectLedger = ({ onCloseModal }) => {
    const onConnectLedger = useStoreActions((actions) => actions.general.onConnectLedger);
    const classes = useStyles();

    const isWebHIDSupported = getWebHIDSupportStatus();
    const connectViaUsb = () =>
        onConnectLedger({ closeConnectLedgerModal: () => onCloseModal(false) });

    return (
        <>
            <h2 className={classes.header}>Connect Ledger</h2>
            {isWebHIDSupported ? (
                <>
                    <p className={classes.description}>
            Connect your Ledger to manage your multi safes in the most secure way
                    </p>
                    <div className={classes.icons}>
                        <Icon onClick={connectViaUsb} title="USB" icon={Usb} />
                    </div>
                </>
            ) : (
                <p className={classes.supportError}>
          Sorry, but your browser does not support WebHID. You can check a list of available
          browsers{' '}
                    <a
                        className={classes.linkToCanIUse}
                        target="_blank"
                        href="https://caniuse.com/webhid"
                        rel="noreferrer"
                    >
            here
                    </a>
                </p>
            )}
            <div className={classes.footer}>
                <Button className={classes.cancel} onClick={onCloseModal}>
          Cancel
                </Button>
            </div>
        </>
    );
};
