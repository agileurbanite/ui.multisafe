import { useStoreState } from 'easy-peasy';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import dateFormat from 'dateformat';
import { Type } from './Type/Type';
import { Status } from './Status/Status';
import { Recipient } from './Recipient/Recipient';
import { formatNearBalance } from '../../../../../../utils/format';
import { useStyles } from './Requests.styles';

export const Requests = () => {
  const requests = useStoreState((store) => store.multisafe.history.requests);
  const classes = useStyles();
  return (
    <>
      <h2 className={classes.header}>Request History</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.requestId}>
                <TableCell>{request.requestId}</TableCell>
                <TableCell>{dateFormat(request.createdAt, 'd mmm yyyy - HH:MM')}</TableCell>
                <Type />
                <Recipient recipient={request.recipient} />
                <TableCell>{formatNearBalance(request.amount)}</TableCell>
                <Status status={request.status} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
