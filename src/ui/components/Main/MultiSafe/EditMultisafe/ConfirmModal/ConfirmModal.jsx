import { Button, Paper, Modal } from '@material-ui/core';
import cn from 'classnames';
import { useStoreActions } from 'easy-peasy';
import { useHistory } from 'react-router';

import { useWalletSelector } from '../../../../../providers/WalletSelectorProvider/WalletSelectorProvider';
import { useStyles } from './ConfirmModal.styles';

export const ConfirmModal = ({
    isOpenConfirmModal,
    closeRemoveModal,
    formData,
    requests
}) => {
    const classes = useStyles();
    const history = useHistory();
    const { selector, selectedWalletId } = useWalletSelector();

    const onEditMultisafe = useStoreActions((actions) => actions.multisafe.onEditMultisafe);
    const onConfirmBatchRequest = useStoreActions((actions) => actions.multisafe.onConfirmBatchRequest);

    const onConfirm = () => formData
        ? onEditMultisafe({ data: formData, history, selector, selectedWalletId })
        : onConfirmBatchRequest({ requests });

    return (
        <Modal
            open={isOpenConfirmModal}
            onClose={closeRemoveModal}
            className={classes.modal}
        >
            <Paper className={classes.container}>
                <div className={classes.wrapper}>
                    <h2 className={classes.header}>Confirm Batch Request</h2>
                    <div className={classes.warning}>
                        {'Changing members and the number of confirmations needs to be a separate request. We can prepare two requests. After confirmation, you will need to confirm two requests, one by one.'}
                    </div>
                    <div className={classes.footer}>
                        <Button onClick={closeRemoveModal} className={classes.cancel}>
                            Cancel
                        </Button>
                        <Button
                            color="secondary"
                            onClick={onConfirm}
                            className={cn(classes.cancel, classes.remove)}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </Paper>
        </Modal>
    );
};
