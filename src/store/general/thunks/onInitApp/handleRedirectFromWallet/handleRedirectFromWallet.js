import { redirectActions } from '@config/redirectActions';
import qs from 'query-string';

import { connectNearWallet } from './connectNearWallet';
import { createMultisafe } from './createMultisafe';

export const handleRedirectFromWallet = async (state, actions, history, signAndSendTransaction) => {
    const query = qs.parse(history.location.search);
    const { redirectAction } = query;

    if (redirectAction === redirectActions.connectNearWallet)
        await connectNearWallet({ state, actions, history, query });

    if (redirectAction === redirectActions.createMultisafe)
        await createMultisafe({ state, actions, history, query });

    if (redirectAction === redirectActions.batchRequest) {
        const { multisafeId, batchRequest: { args, method } } = state.general.temporary;
        await signAndSendTransaction({
            receiverId: multisafeId,
            actions: [{
                type: 'FunctionCall',
                params: {
                    methodName: method,
                    args: args.args,
                    gas: config.gas.default,
                },
            }],
            callbackUrl: args.callbackUrl,
        });
    }

    if (redirectAction === redirectActions.batchConfirm) {
        const { multisafeId, batchConfirm: { args } } = state.general.temporary;
        await signAndSendTransaction({
            receiverId: multisafeId,
            actions: [{
                type: 'FunctionCall',
                params: {
                    methodName: 'confirm',
                    args: args.args,
                    gas: config.gas.default,
                },
            }],
            callbackUrl: args.callbackUrl,
        });
    }
};
