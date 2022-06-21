import { Paper, Modal, Button, Backdrop, CircularProgress } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';

import ledgerDevice from '../../images/ledger-device.png';
import { useStyles } from './ConfirmActionOnLedger.styles';

export const ConfirmActionOnLedger = () => {
    const modal = useStoreState((state) => state.general.modals.confirmActionOnLedger);
    const closeModal = useStoreActions((actions) => actions.general.closeModal);
    const classes = useStyles();

    if (!modal) return null;
    const { error, showLoader } = modal;

    const onCloseModal = () => closeModal({ modal: 'confirmActionOnLedger' });

    return (
        <Modal
            className={classes.modal}
            open
            BackdropComponent={Backdrop}
            BackdropProps={{ classes: { root: classes.backdropRoot } }}
        >
            <Paper className={classes.container} elevation={4}>
                <div className={classes.wrapper}>
                    <h2 className={classes.header}>Confirm the action on Ledger</h2>
                    <div className={classes.imageWrapper}>
                        <img src={ledgerDevice} alt="ledger device" className={classes.ledgerDeviceImage} />
                    </div>
                    <div className={classes.content}>
                        {!showLoader && !error && <h3 className={classes.actionName}>{modal.actionName}</h3>}
                        {showLoader && !error && (
                            <div className={classes.loaderWrapper}>
                Transaction in progress... <CircularProgress size={16}/>
                            </div>
                        )}
                        {error && <p className={classes.error}>{error}</p>}
                    </div>
                    <div className={classes.footer}>
                        {error && (
                            <Button className={classes.gotIt} onClick={onCloseModal}>
                Got It
                            </Button>
                        )}
                    </div>
                </div>
            </Paper>
        </Modal>
    );
};
