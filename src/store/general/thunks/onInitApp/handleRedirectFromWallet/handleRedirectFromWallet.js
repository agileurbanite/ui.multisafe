import qs from 'query-string';

import { redirectActions } from '../../../../../config/redirectActions';
import { connectNearWallet } from './connectNearWallet';
import { createMultisafe } from './createMultisafe';

export const handleRedirectFromWallet = async (state, actions, history) => {
    const query = qs.parse(history.location.search);
    const { redirectAction } = query;

    if (redirectAction === redirectActions.connectNearWallet)
        await connectNearWallet({ state, actions, history, query });

    if (redirectAction === redirectActions.createMultisafe)
        await createMultisafe({ state, actions, history, query });
};
