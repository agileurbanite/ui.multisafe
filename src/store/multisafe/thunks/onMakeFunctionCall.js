import { Buffer } from 'buffer';

import { thunk } from 'easy-peasy';

import { config } from '../../../near/config';
import { formatTGasValue } from '../../../utils/format';
import { signTransactionByLedger } from '../helpers/signTransactionByLedger';

const ADD_REQUEST_AND_CONFIRM_GAS = config.gas.add_and_confirm;

const addFunctionCallRequest = async ({
    multisafeContract,
    withApprove,
    smartContractAddress,
    methodName,
    args,
    deposit,
    tGas
}) => {
    const method = withApprove ? 'add_request_and_confirm' : 'add_request';

    return multisafeContract[method](
        {
            args: {
                request: {
                    receiver_id: smartContractAddress,
                    actions: [{
                        type: 'FunctionCall',
                        method_name: methodName,
                        args: Buffer.from(args).toString('base64'),
                        deposit: deposit.toString(),
                        gas: formatTGasValue(tGas),
                    }]
                },
            },
            gas: ADD_REQUEST_AND_CONFIRM_GAS
        },
    );
};

const signTxByLedger = async ({
    multisafeContract,
    withApprove,
    smartContractAddress,
    methodName,
    multisafeId,
    args,
    deposit,
    tGas,
    state,
    actions
}) => {
    await signTransactionByLedger({
        actionName: methodName,
        state,
        actions,
        contractMethod: () => addFunctionCallRequest({
            multisafeContract,
            withApprove,
            smartContractAddress,
            methodName,
            multisafeId,
            args,
            deposit,
            tGas,
        }),
        callback: async () => {
            await actions.multisafe.onMountDashboard(multisafeId);
        },
    });
};

export const onMakeFunctionCall = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
    const { onClose } = payload;
    const {
        withApprove,
        smartContractAddress,
        methodName,
        args,
        deposit,
        tGas
    } = payload.data;

    const state = getStoreState();
    const isNearWallet = state.general.selectors.isNearWallet;
    const multisafeContract = state.multisafe.entities.contract;
    const multisafeId = state.multisafe.general.multisafeId;
    const actions = getStoreActions();

    isNearWallet
        ? addFunctionCallRequest({
            multisafeContract,
            withApprove,
            smartContractAddress,
            methodName,
            args,
            deposit,
            tGas
        })
        : await signTxByLedger({
            multisafeContract,
            withApprove,
            smartContractAddress,
            methodName,
            multisafeId,
            args,
            deposit,
            tGas,
            state,
            actions
        });

    onClose();
});