import { TableCell, TableRow } from '@material-ui/core';
import { Actions } from '../Actions/Actions';

export const Row = ({ members, classNames }) => (
  <>
    {members.map((member) => (
      <TableRow key={member.accountId}>
        <TableCell className={classNames?.tableCell}>{member.accountId}</TableCell>
        <TableCell className={classNames?.tableCellActions}>
          <Actions accountId={member.accountId} />
        </TableCell>
      </TableRow>
    ))}
  </>
);
