import { TableCell } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import { config } from '@near/config';
import { ConfirmModal } from '@ui/components/Main/MultiSafe/EditMultisafe/ConfirmModal/ConfirmModal';
import cn from 'classnames';
import { useState, useEffect } from 'react';

import { useStyles } from './Status.styles';

const canDeleteRequest = (createdAt) =>
    Date.now() > createdAt + config.multisafe.deleteRequestCooldown;

export const BatchStatus = ({ requests }) => {
    const { isMember, createdAt } = requests[0];
    const [isOpenConfirmModal, setOpenConfirmModal] = useState(false);
    const { hasUserConfirm, totalNum, currentNum } = requests[0].confirms;


    const [canDelete, setCanDelete] = useState(canDeleteRequest(createdAt));
    const classes = useStyles({ hasUserConfirm, canDelete, isMember, hideDelete: true });

    useEffect(() => {
        if (!isMember || canDelete) return () => {};

        // Sometimes indexer does not have time to add a new record about last transaction (add_request)
        // into the database and 'createdAt' will be NaN
        const cooldownRemains = Number.isNaN(createdAt)
            ? config.multisafe.deleteRequestCooldown
            : createdAt + config.multisafe.deleteRequestCooldown - Date.now();

        const timeout = setTimeout(() => {
            setCanDelete(true);
        }, cooldownRemains);

        return () => {
            clearTimeout(timeout);
        };
    }, [isMember, canDelete, createdAt]);

    const confirmRequest = () => setOpenConfirmModal(true);

    return (
        <>
            <ConfirmModal
                isOpenConfirmModal={isOpenConfirmModal}
                closeRemoveModal={() => setOpenConfirmModal(false)}
                requests={requests}
            />
        
            <TableCell className={classes.tableCell}>
                <div className={classes.container}>
                    <button
                        type="button"
                        className={cn(classes.button, { [classes.disabledButton]: !isMember })}
                        onClick={confirmRequest}
                        disabled={!isMember || hasUserConfirm}
                    >
                        <Done className={classes.doneIcon} />
                        <span className={classes.description}>{`${currentNum}/${totalNum}`}</span>
                    </button>
                </div>
            </TableCell>
        </>
    );
};
