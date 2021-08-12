import { useState, useEffect } from 'react';
import { TableCell, IconButton } from '@material-ui/core';
import { Done, Close } from '@material-ui/icons';
import { config } from '../../../../../../../near/config';
import { useStyles } from './Status.styles';

const canDeleteRequest = (createdAt) =>
  Date.now() > createdAt + config.multisafe.deleteRequestCooldown;

export const Status = ({ request, onConfirmRequest, onDeleteRequest }) => {
  const { requestId, isMember, createdAt } = request;
  const { hasUserConfirm, totalNum, currentNum } = request.confirms;
  const [canDelete, setCanDelete] = useState(canDeleteRequest(createdAt));
  const classes = useStyles({ hasUserConfirm, canDelete });

  useEffect(() => {
    if (!isMember || canDelete) return () => {};

    const cooldownRemains = createdAt + config.multisafe.deleteRequestCooldown - Date.now();

    const timeout = setTimeout(() => {
      setCanDelete(true);
    }, cooldownRemains);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const confirmRequest = () => onConfirmRequest({ requestId });
  const deleteRequest = () => onDeleteRequest({ requestId });
  return (
    <TableCell className={classes.tableCell}>
      {isMember ? (
        <div className={classes.container}>
          <button
            type="button"
            className={classes.button}
            onClick={confirmRequest}
            disabled={hasUserConfirm}
          >
            <Done className={classes.doneIcon} />
            <span className={classes.description}>{`${currentNum}/${totalNum}`}</span>
          </button>
          <IconButton className={classes.cancel} onClick={deleteRequest} disabled={!canDelete}>
            <Close className={classes.cancelIcon} />
          </IconButton>
        </div>
      ) : (
        <span>Pending</span>
      )}
    </TableCell>
  );
};
