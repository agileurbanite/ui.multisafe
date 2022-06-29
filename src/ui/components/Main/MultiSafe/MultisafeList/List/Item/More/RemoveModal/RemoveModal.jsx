import { Button, Paper, Modal } from '@material-ui/core';
import cn from 'classnames';
import { useStoreActions } from 'easy-peasy';
import { useHistory } from 'react-router-dom';

import { useStyles } from './RemoveModal.styles';

export const RemoveModal = ({
    isOpenRemoveModal,
    closeRemoveModal,
    stopPropagation,
    multisafeId,
    name,
}) => {
    const onRemoveLocalMultisafe = useStoreActions(
        (actions) => actions.multisafe.onRemoveLocalMultisafe,
    );
    const history = useHistory();
    const classes = useStyles();

    const onRemoveMultisafe = () => onRemoveLocalMultisafe({ history, multisafeId });

    return (
        <Modal
            onClick={stopPropagation}
            open={isOpenRemoveModal}
            onClose={closeRemoveModal}
            className={classes.modal}
        >
            <Paper className={classes.container}>
                <div className={classes.wrapper}>
                    <h2 className={classes.header}>Remove Multi Safe</h2>
                    <div className={classes.warning}>
                        {`Are you sure to remove "${name}" from list?
                        Notice that it is be removed only locally
                        from your browser - you won't delete it from
                        the blockchain.`}
                    </div>
                    <div className={classes.footer}>
                        <Button onClick={closeRemoveModal} className={classes.cancel}>
                            Cancel
                        </Button>
                        <Button
                            color="secondary"
                            onClick={onRemoveMultisafe}
                            className={cn(classes.cancel, classes.remove)}
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            </Paper>
        </Modal>
    );
};
