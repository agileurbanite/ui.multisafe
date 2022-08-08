import { config } from '@near/config';
import FungibleTokens from '@services/FungibleTokens';
import { parseOtherAmount } from '@utils/format';
import { thunk } from 'easy-peasy';
import * as nearApiJs from 'near-api-js';

import { signTransactionByLedger } from '../helpers/signTransactionByLedger';

const ATTACHED_GAS = config.gas.default;

const {
    utils: {
        format: { parseNearAmount },
    },
} = nearApiJs;

const addTransferNearRequest = async ({ signAndSendTransaction, withApprove, recipientId, amount, multisafeId }) => {
    const method = withApprove ? 'add_request_and_confirm' : 'add_request';

    return await signAndSendTransaction({
        receiverId: multisafeId,
        actions: [{
            type: 'FunctionCall',
            params: {
                methodName: method,
                args: {
                    request: {
                        receiver_id: recipientId,
                        actions: [{ type: 'Transfer', amount: parseNearAmount(amount) }],
                    },
                },
                gas: ATTACHED_GAS,
            },

        }],
    });
};

const signNearTxByLedger = async ({
    signAndSendTransaction,
    withApprove,
    recipientId,
    amount,
    multisafeId,
    state,
    actions,
}) => {
    return await signTransactionByLedger({
        actionName: 'Transfer',
        state,
        actions,
        contractMethod: async () => await addTransferNearRequest({ signAndSendTransaction, withApprove, recipientId, amount, multisafeId }),
        callback: async () => {
            return await actions.multisafe.onMountDashboard(multisafeId);
        },
    });
};

const signTxByLedger = async ({
    fungibleTokensService,
    signAndSendTransaction,
    signAndSendTransactions,
    contract,
    withApprove,
    recipientId,
    amount,
    contractName,
    multisafeId,
    state,
    actions,
}) => {
    return await signTransactionByLedger({
        actionName: 'Transfer',
        state,
        actions,
        contractMethod: () => fungibleTokensService.addTransferRequest({ multisafeContract: contract, withApprove, recipientId, amount, contractName, signAndSendTransaction, signAndSendTransactions, multisafeId }),
        callback: async () => {
            return await actions.multisafe.onMountDashboard(multisafeId);
        },
    });
};

export const onTransferTokens = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
    const { onClose, token, selector, selectedWalletId } = payload;
    const { recipientId, amount, withApprove } = payload.data;
    const wallet = await selector.wallet();
    const signAndSendTransaction = wallet.signAndSendTransaction;
    const signAndSendTransactions = wallet.signAndSendTransactions;

    const state = getStoreState();
    const near = state.general.entities.near;
    const contract = state.multisafe.entities.contract;
    const multisafeId = state.multisafe.general.multisafeId;
    const actions = getStoreActions();
    const fungibleTokensService = new FungibleTokens(near.connection);
    const isNearTransaction = !token;

    // token is assumed to be NEAR if alternate token is not given
    if (isNearTransaction) {
        // If new wallet gets introduced, please update here
        switch (selectedWalletId) {
            case 'near-wallet':
            case 'my-near-wallet':
                await addTransferNearRequest({ signAndSendTransaction, withApprove, recipientId, amount, multisafeId });
                break;
            case 'ledger':
                await signNearTxByLedger({ signAndSendTransaction, withApprove, recipientId, amount, multisafeId, state, actions });
                break;
            default:
                throw Error(`Unsupported wallet selected: '${selectedWalletId}'`);
        }
    }
    else {
        // If new wallet gets introduced, please update here
        switch (selectedWalletId) {
            case 'near-wallet':
            case 'my-near-wallet':
                await fungibleTokensService.addTransferRequest({
                    multisafeContract: contract,
                    withApprove,
                    recipientId,
                    amount: parseOtherAmount(token, amount),
                    contractName: token.contractName,
                    signAndSendTransaction,
                    signAndSendTransactions,
                    multisafeId,
                });
                break;
            case 'ledger':
                await signTxByLedger({
                    contract,
                    fungibleTokensService,
                    signAndSendTransaction,
                    signAndSendTransactions,
                    withApprove,
                    recipientId,
                    amount: parseOtherAmount(token, amount),
                    multisafeId,
                    state,
                    actions,
                    contractName: token.contractName,
                });
                break;
            default:
                throw Error(`Unsupported wallet selected: '${selectedWalletId}'`);
        }
    }
    onClose();
});
