import { Buffer } from 'buffer';

import { thunk } from 'easy-peasy';

import { config } from '../../../near/config';
import { formatTGasValue } from '../../../utils/format';
import { signTransactionByLedger } from '../helpers/signTransactionByLedger';

const ADD_REQUEST_AND_CONFIRM_GAS = config.gas.add_and_confirm;

const addFunctionCallRequest = async ({
    withApprove,
    smartContractAddress,
    methodName,
    args,
    deposit,
    tGas,
    signAndSendTransaction,
    multisafeId,
}) => {
    const method = withApprove ? 'add_request_and_confirm' : 'add_request';

    return await signAndSendTransaction({
        receiverId: multisafeId,
        actions: [{
            type: 'FunctionCall',
            params: {
                methodName: method,
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
            
        }],
    });
};

const signTxByLedger = async ({
    withApprove,
    smartContractAddress,
    methodName,
    multisafeId,
    args,
    deposit,
    tGas,
    state,
    actions,
    signAndSendTransaction,
}) => {
    await signTransactionByLedger({
        actionName: methodName,
        state,
        actions,
        contractMethod: () => addFunctionCallRequest({
            withApprove,
            smartContractAddress,
            methodName,
            args,
            deposit,
            tGas,
            signAndSendTransaction,
            multisafeId,
        }),
        callback: async () => {
            await actions.multisafe.onMountDashboard(multisafeId);
        },
    });
};

export const onMakeFunctionCall = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
    const { onClose, selector, selectedWalletId } = payload;
    const wallet = await selector.wallet();
    const signAndSendTransaction = wallet.signAndSendTransaction;

    const {
        withApprove,
        smartContractAddress,
        methodName,
        args,
        deposit,
        tGas
    } = payload.data;

    const state = getStoreState();
    const multisafeId = state.multisafe.general.multisafeId;
    const actions = getStoreActions();

    // If new wallet gets introduced, please update here
    switch (selectedWalletId) {
        case 'near-wallet':
        case 'my-near-wallet':
            await addFunctionCallRequest({
                withApprove,
                smartContractAddress,
                methodName,
                args,
                deposit,
                tGas,
                signAndSendTransaction,
                multisafeId,
            });
            break;
        case 'ledger':
            await signTxByLedger({
                withApprove,
                smartContractAddress,
                methodName,
                multisafeId,
                args,
                deposit,
                tGas,
                state,
                actions,
                signAndSendTransaction,
            });
            break;
        default:
            throw Error(`Unsupported wallet selected: '${selectedWalletId}'`);
    }

    onClose();
});
