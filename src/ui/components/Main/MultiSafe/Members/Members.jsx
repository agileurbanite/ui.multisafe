import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { Actions } from './Actions/Actions';
import { useStyles } from './Members.styles';

export const Members = () => {
  const members = useStoreState(({ multisafe }) => multisafe.members);
  const onDeleteRequest = useStoreActions((actions) => actions.multisafe.onDeleteRequest);
  const [cellIndex, setCellIndex] = React.useState(null);

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2 className={classes.header}>Members</h2>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Member Name</TableCell>
              <TableCell colSpan={2}>Member Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member, idx) => (
              <TableRow
                key={member.memberName}
                className={classes.tableRow}
                onMouseEnter={() => setCellIndex(idx)}
                onMouseLeave={() => setCellIndex(null)}>
                <TableCell className={classes.tableCell} width="30%">{member.memberName}</TableCell>
                <TableCell className={classes.tableCell} width="50%">{member.accountId}</TableCell>
                <TableCell className={classes.tableCellActions} width="20%">
                  {cellIndex === idx && (
                    <Actions accountId={member.accountId} onDeleteRequest={onDeleteRequest} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
