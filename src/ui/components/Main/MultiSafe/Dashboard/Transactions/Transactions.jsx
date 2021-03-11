import { useStoreActions, useStoreState } from 'easy-peasy';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { Type } from './Type/Type';
import { Status } from './Status/Status';
import { Recipient } from './Recipient/Recipient';
import { formatNearBalance } from '../../../../../../utils/format';
import { useStyles } from './Transactions.styles';

export const Transactions = () => {
  const transactions = useStoreState((store) => store.multisafe.dashboard.transactions);
  const onConfirmRequest = useStoreActions((actions) => actions.multisafe.onConfirmRequest);
  const onDeleteRequest = useStoreActions((actions) => actions.multisafe.onDeleteRequest);
  const classes = useStyles();
  return (
    <>
      <h2 className={classes.header}>Transactions</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.requestId}>
                <TableCell>{transaction.requestId}</TableCell>
                <Type />
                <Recipient recipient={transaction.recipient} />
                <TableCell>{formatNearBalance(transaction.amount)}</TableCell>
                <Status
                  transaction={transaction}
                  onConfirmRequest={onConfirmRequest}
                  onDeleteRequest={onDeleteRequest}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
