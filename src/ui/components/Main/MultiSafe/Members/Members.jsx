import { useStoreState } from 'easy-peasy';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { useStyles } from './Members.styles';
import { Row } from './Row/Row';

export const Members = () => {
  const members = useStoreState(({ multisafe }) => multisafe.members);
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
            <Row members={members} classNames={classes}/>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
