import { action } from 'easy-peasy';
import { convertNanoToMilli } from '../../helpers/convertNanoToMilli';

// Get list of all successful transactions with tx result
const getSuccessTxs = (requestTxStatuses) =>
  requestTxStatuses
    .filter(({ status }) => typeof status.successValue === 'string')
    .reduce((acc, { status, transaction }) => {
      acc[transaction.hash] = atob(status.successValue);
      return acc;
    }, {});

const getActiveRequestIds = (requestIds) =>
  requestIds.reduce((acc, id) => {
    acc[id] = id;
    return acc;
  }, {});

const getDeletedRequestIds = (requestTxs, successTxs) =>
  requestTxs
    .filter(
      ({ args, transactionHash }) =>
        args.methodName === 'delete_request' && typeof successTxs[transactionHash] === 'string',
    )
    .reduce((acc, { args }) => {
      acc[args.argsJson.requestId] = args.argsJson.requestId;
      return acc;
    }, {});

const getRequests = (requestTxs, successTxs, activeRequestIds, deletedRequestIds) =>
  requestTxs
    .filter(
      ({ args, transactionHash }) =>
        (args.methodName === 'add_request' || args.methodName === 'add_request_and_confirm') &&
        typeof successTxs[transactionHash] === 'string',
    )
    .map(({ args, blockTimestamp, transactionHash }) => {
      const requestId = Number(successTxs[transactionHash]);
      return {
        requestId,
        createdAt: convertNanoToMilli(blockTimestamp),
        type: args.argsJson.request.actions[0].type,
        recipient: args.argsJson.request.receiverId,
        amount: args.argsJson.request.actions[0].amount,
        status: deletedRequestIds[requestId] ? 'deleted' : 'completed',
      };
    })
    .filter(({ requestId }) => !activeRequestIds[requestId])
    .sort((a, b) => b.requestId - a.requestId);

export const mountHistory = action((state, payload) => {
  const { requestIds, requestTxs, requestTxStatuses } = payload;

  const successTxs = getSuccessTxs(requestTxStatuses);
  const activeRequestIds = getActiveRequestIds(requestIds);
  const deletedRequestIds = getDeletedRequestIds(requestTxs, successTxs);

  state.history.requests = getRequests(requestTxs, successTxs, activeRequestIds, deletedRequestIds);
});
