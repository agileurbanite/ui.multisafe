import qs from 'query-string';

import { redirectActions } from '../../../../../config/redirectActions';
import { getMultisafeContract } from '../../../../multisafe/helpers/getMultisafeContract';
import { connectNearWallet } from './connectNearWallet';
import { createMultisafe } from './createMultisafe';

export const handleRedirectFromWallet = async (state, actions, history) => {
    const query = qs.parse(history.location.search);
    const { redirectAction } = query;

    if (redirectAction === redirectActions.connectNearWallet)
        await connectNearWallet({ state, actions, history, query });

    if (redirectAction === redirectActions.createMultisafe)
        await createMultisafe({ state, actions, history, query });

    if (redirectAction === redirectActions.batchRequest) {
        const { multisafeId, batchRequest: { args, method } } = state.general.temporary;
        const contract = getMultisafeContract(state, multisafeId);
        contract[method](args);
    }

    if (redirectAction === redirectActions.batchConfirm) {
        const { multisafeId, batchConfirm: { args } } = state.general.temporary;
        const contract = getMultisafeContract(state, multisafeId);
        contract.confirm(args);
    }
};
