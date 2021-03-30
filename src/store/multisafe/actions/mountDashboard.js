import { action } from 'easy-peasy';

export const mountDashboard = action((state, payload) => {
  const { requests, requestIds, accountId, numConfirmations } = payload;

  state.dashboard.transactions = requestIds
    .map((requestId, index) => {
      const request = requests[index][0];
      const confirms = requests[index][1].map((confirm) => JSON.parse(confirm));
      return {
        requestId,
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
    .reverse();
});
