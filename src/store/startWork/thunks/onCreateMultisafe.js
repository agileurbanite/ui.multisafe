import { thunk } from 'easy-peasy';
import { utils } from 'near-api-js';

import { redirectActions } from '../../../config/redirectActions';
import { config } from '../../../near/config';
import { getRoute } from '../../../ui/config/routes';
import { spaceToSnake } from '../../../utils/format';
import { signTransactionByLedger } from '../../multisafe/helpers/signTransactionByLedger';
import { getMultisafeFactoryContract } from '../helpers/getMultisafeFactoryContract';

const serializeData = ({ name, multisafeId, members, num_confirmations, amount }) => ({
    name,
    multisafeId: spaceToSnake(multisafeId),
    multisafeAccountId: `${spaceToSnake(multisafeId)}.${config.multisafeFactoryId}`,
    numConfirmations: Number(num_confirmations),
    amount: utils.format.parseNearAmount(amount),
    members: members.map(({ account_id }) => ({ account_id })),
});

const createMultisafe = (contract, values) => {
    const { multisafeId, members, numConfirmations, amount } = values;

    return contract.create({
        args: {
            name: multisafeId,
            members,
            num_confirmations: numConfirmations,
        },
        gas: config.maxGas,
        amount,
        callbackUrl: getRoute.callbackUrl({ redirectAction: redirectActions.createMultisafe }),
    });
};

const signByNearWallet = (contract, values, actions) => {
    actions.general.setTemporaryData({
        redirectAction: redirectActions.createMultisafe,
        name: values.name,
        multisafeId: values.multisafeAccountId,
    });

    createMultisafe(contract, values);
};

const signTxByLedger = async (contract, values, state, actions, history) => {
    await signTransactionByLedger({
        actionName: 'Create Multi Safe',
        state,
        actions,
        contractMethod: () => createMultisafe(contract, values),
        callback: () => {
            actions.multisafe.addMultisafe({
                name: values.name,
                multisafeId: values.multisafeAccountId,
            });
            history.push(getRoute.dashboard(values.multisafeAccountId));
        },
    });
};

export const onCreateMultisafe = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
    const { data, history } = payload;

    const state = getStoreState();
    const isNearWallet = state.general.selectors.isNearWallet;

    const actions = getStoreActions();
    const factoryContract = getMultisafeFactoryContract(state);
    const values = serializeData(data);

    isNearWallet
        ? signByNearWallet(factoryContract, values, actions)
        : await signTxByLedger(factoryContract, values, state, actions, history);
});
