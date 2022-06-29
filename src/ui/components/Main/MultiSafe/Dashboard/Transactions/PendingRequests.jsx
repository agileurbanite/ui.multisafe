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
import { Type } from '../../general/Type/Type';
import { useStyles } from './PendingRequests.styles';
import { Recipient } from './Recipient/Recipient';
import { Status } from './Status/Status';

export const PendingRequests = () => {
    const pendingRequests = useStoreState((store) => store.multisafe.dashboard.pendingRequests);
    const onConfirmRequest = useStoreActions((actions) => actions.multisafe.onConfirmRequest);
    const onDeleteRequest = useStoreActions((actions) => actions.multisafe.onDeleteRequest);
    const classes = useStyles();

    const hasActiveRequests = pendingRequests.length > 0;

    const isBatchRequest = (candidate, newRequest) => {
        if (
            !candidate.batchRequest
            && candidate.requestId - newRequest.requestId === 1
            && candidate.createdAt - newRequest.createdAt < 120000
            && candidate.type === 'SetNumConfirmations'
            && ['DeleteMember', 'AddMember'].includes(newRequest.type)
        ) {
            return true;
        }
        return false;
    };
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
                                    <Type type={request.type} />
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
