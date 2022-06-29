import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
} from '@material-ui/core';
import dateFormat from 'dateformat';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Fragment } from 'react';

import { formatNearBalance } from '../../../../../../utils/format';
import { Type } from '../../general/Type/Type';
import { useStyles } from './PendingRequests.styles';
import { Recipient } from './Recipient/Recipient';
// import { BatchStatus } from './Status/BatchStatus';
import { Status } from './Status/Status';

export const PendingRequests = () => {
    const pendingRequests = useStoreState((store) => store.multisafe.dashboard.pendingRequests);
    const onConfirmRequest = useStoreActions((actions) => actions.multisafe.onConfirmRequest);
    const onDeleteRequest = useStoreActions((actions) => actions.multisafe.onDeleteRequest);
    const toggleBatchRequestView = useStoreActions((actions) => actions.general.toggleBatchRequestView);
    const batchRequestView = useStoreState((store) => store.general.batchRequestView);
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

    const requestsList = batchRequestView
        ? pendingRequests.reduce((x, request, i) => {
            if (i && isBatchRequest(x[x.length-1], request)) {
                const first = x.pop();
                x.push({
                    batchRequest: true,
                    requests: [
                        request,
                        first
                    ]
                });
            } else {
                x.push(request);
            }
            return x;
        }, [])
        : pendingRequests;

    const switchBatchTransactions = () => {
        toggleBatchRequestView();
    };

    return (
        <>
            <div className={classes.header}>
                <h2 className={classes.h2}>Pending Requests</h2>
                <Button 
                    component="button"
                    variant='contained'
                    color="primary" 
                    className={classes.button}
                    onClick={switchBatchTransactions}
                >
                    {batchRequestView
                        ? 'Disable Batch Request'
                        : 'Enable Batch Request'
                    }
                </Button>
            </div>
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
                            {requestsList.map((request, i) => request.batchRequest
                                ? (
                                    <Fragment key={`batch-${i}`}>
                                        <TableRow className={classes.batchRequest}>
                                            <TableCell colSpan={2}>Batch Request</TableCell>
                                            <TableCell colSpan={4}>We recognize these two requests as a Batch Request, please confirm in the shown order</TableCell>
                                            {/* <BatchStatus
                                                request={request.requests[0]}
                                                onConfirmRequest={onConfirmRequest}
                                                onDeleteRequest={onDeleteRequest}
                                            /> */}
                                        </TableRow>
                                        {request.requests.map((request) => (
                                            <TableRow key={request.requestId} className={classes.batchRequest}>
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
                                    </Fragment>
                                ) : (
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
                                )
                            )}
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
