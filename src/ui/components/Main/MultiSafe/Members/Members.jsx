import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core';
import { useStoreState } from 'easy-peasy';

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
                            <TableCell>Member Account ID</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <Row members={members} classNames={classes} />
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
