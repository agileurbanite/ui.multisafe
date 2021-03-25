import { TableCell } from '@material-ui/core';
import { Done, Close } from '@material-ui/icons';
import { useStyles } from './Status.styles';

export const Status = ({ transaction, onConfirmRequest, onDeleteRequest }) => {
  const { requestId, isMember } = transaction;
  const { hasUserConfirm, totalNum, currentNum } = transaction.confirms;

  const classes = useStyles({ hasUserConfirm });

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
            disabled={hasUserConfirm}>
            <Done className={classes.doneIcon} />
            <span className={classes.description}>{`${currentNum}/${totalNum}`}</span>
          </button>
          <button type="button" className={classes.cancel} onClick={deleteRequest}>
            <Close className={classes.cancelIcon} />
          </button>
        </div>
      ) : (
        <span>Pending</span>
      )}
    </TableCell>
  );
};
