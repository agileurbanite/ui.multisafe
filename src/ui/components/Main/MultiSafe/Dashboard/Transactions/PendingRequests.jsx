import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core';
import dateFormat from 'dateformat';
import { useStoreActions, useStoreState } from 'easy-peasy';

import { formatNearBalance } from '../../../../../../utils/format';
import { useStyles } from './PendingRequests.styles';
import { Recipient } from './Recipient/Recipient';
import { Status } from './Status/Status';
import { Type } from './Type/Type';

export const PendingRequests = () => {
    const pendingRequests = useStoreState((store) => store.multisafe.dashboard.pendingRequests);
    const onConfirmRequest = useStoreActions((actions) => actions.multisafe.onConfirmRequest);
    const onDeleteRequest = useStoreActions((actions) => actions.multisafe.onDeleteRequest);
    const classes = useStyles();

    const hasActiveRequests = pendingRequests.length > 0;

    return (
        <>
            <h2 className={classes.header}>Pending Requests</h2>
            {hasActiveRequests ? (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Recipient</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pendingRequests.map((request) => (
                                <TableRow key={request.requestId}>
                                    <TableCell>{request.requestId}</TableCell>
                                    <TableCell>{dateFormat(request.createdAt, 'd mmm yyyy - HH:MM')}</TableCell>
                                    <Type />
                                    <Recipient recipient={request.recipient} />
                                    <TableCell>{formatNearBalance(request.amount)}</TableCell>
                                    <Status
                                        request={request}
                                        onConfirmRequest={onConfirmRequest}
                                        onDeleteRequest={onDeleteRequest}
                                    />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <div className={classes.noRequestsContainer}>
                    <p>No active requests</p>
                </div>
            )}
        </>
    );
};
