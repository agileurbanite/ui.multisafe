import { TableCell, IconButton } from '@material-ui/core';
import { Done, Close } from '@material-ui/icons';
import cn from 'classnames';
import { useState, useEffect } from 'react';

import { config } from '../../../../../../../near/config';
import { useStyles } from './Status.styles';

const canDeleteRequest = (createdAt) =>
    Date.now() > createdAt + config.multisafe.deleteRequestCooldown;

export const BatchStatus = ({ request, onConfirmRequest, onDeleteRequest }) => {
    const { requestId, isMember, createdAt } = request;
    const { hasUserConfirm, totalNum, currentNum } = request.confirms;
    const [canDelete, setCanDelete] = useState(canDeleteRequest(createdAt));
    const classes = useStyles({ hasUserConfirm, canDelete, isMember });

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

    const confirmRequest = () => onConfirmRequest({ requestId });
    const deleteRequest = () => onDeleteRequest({ requestId });

    return (
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
                {isMember && (
                    <IconButton className={classes.cancel} onClick={deleteRequest} disabled={!canDelete}>
                        <Close className={classes.cancelIcon} />
                    </IconButton>
                )}
            </div>
        </TableCell>
    );
};
