import { action } from 'easy-peasy';
import { convertNanoToMilli } from '../../helpers/convertNanoToMilli';

const getRequestsTxs = (addRequestTxs, txsStatuses) => {
  const txs = addRequestTxs.reduce((acc, tx) => {
    acc[tx.transaction_hash] = tx.block_timestamp;
    return acc;
  }, {});

  return txsStatuses
    .filter(({ status }) => status.SuccessValue)
    .reduce((acc, { status, transaction }) => {
      const requestId = atob(status.SuccessValue);
      acc[requestId] = {
        createdAt: txs[transaction.hash],
      };
      return acc;
    }, {});
};

export const mountDashboard = action((state, payload) => {
  const { requests, requestIds, addRequestTxs, txsStatuses, accountId, numConfirmations } = payload;

  const requestsTxs = getRequestsTxs(addRequestTxs, txsStatuses);

  state.dashboard.pendingRequests = requestIds
    .map((requestId, index) => {
      const request = requests[index][0];
      const confirms = requests[index][1].map((confirm) => JSON.parse(confirm));
      return {
        requestId,
        createdAt: convertNanoToMilli(requestsTxs[requestId].createdAt),
        type: request.actions[0].type,
        amount: request.actions[0].amount,
        recipient: request.receiver_id,
        confirms: {
          totalNum: numConfirmations,
          currentNum: confirms.length,
          hasUserConfirm: confirms.some((confirm) => confirm.account_id === accountId),
        },
        // We need this to avoid rerender Status component when we load read-only multisafe
        isMember: state.selectors.isMember,
      };
    })
    .sort((a, b) => b.requestId - a.requestId);
});
