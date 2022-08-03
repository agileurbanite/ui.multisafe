import * as nearApiJs from 'near-api-js';

import { config } from '../near/config';

const FT_MINIMUM_STORAGE_BALANCE = config.gas.storage_deposit;
const FT_MINIMUM_STORAGE_BALANCE_LARGE = config.gas.storage_deposit_large;
const FT_STORAGE_DEPOSIT_GAS = config.gas.storage_gas;
const FT_TRANSFER_GAS = config.gas.transfer;
const ADD_REQUEST_AND_CONFIRM_GAS = config.gas.add_and_confirm;
const ATTACHED_GAS = config.gas.default;

// contract might require an attached depositof of at least 1 yoctoNear on transfer methods
// "This 1 yoctoNEAR is not enforced by this standard, but is encouraged to do. While ability to receive attached deposit is enforced by this token."
// from: https://github.com/near/NEPs/issues/141
const FT_TRANSFER_DEPOSIT = '1';

// Fungible Token Standard
// https://github.com/near/NEPs/tree/master/specs/Standards/FungibleToken

export default class FungibleTokens {

    constructor(connection) {
        this.connection = connection;
        this.viewFunctionAccount = new nearApiJs.Account(this.connection, 'dontcare');;
    };

    getStorageBalance = async ({ contractName, accountId }) => this.viewFunctionAccount.viewFunction(
        contractName,
        'storage_balance_of',
        { account_id: accountId }
    );

    getMetadata = async({ contractName }) => this.viewFunctionAccount.viewFunction(
        contractName,
        'ft_metadata'
    );
    

    getBalanceOf = async ({ contractName, accountId }) => this.viewFunctionAccount.viewFunction(
        contractName,
        'ft_balance_of',
        { account_id: accountId }
    );

    isStorageBalanceAvailable = async ({ contractName, accountId }) => {
        const storageBalance = await this.getStorageBalance({
            contractName,
            accountId,
        });
        return storageBalance?.total !== undefined;
    };

    transferStorageDeposit = async ({
        withApprove,
        contractName,
        recipientId,
        storageDepositAmount,
        transferAmount,
        signAndSendTransactions,
        multisafeId,
    }) => {
        const method = withApprove ? 'add_request_and_confirm' : 'add_request';
        const storageArgs = Buffer.from(`{"account_id": "${recipientId}", "registration_only": true}`).toString('base64');
        const transferArgs = Buffer.from(`{"amount": "${transferAmount}", "receiver_id": "${recipientId}"}`)
            .toString('base64');

        const transactions = [
            {
                receiverId: multisafeId,
                actions: [{
                    type: 'FunctionCall',
                    params: {
                        methodName: method,
                        args: {
                            request: {
                                receiver_id: contractName,
                                actions: [
                                    {
                                        type: 'FunctionCall',
                                        method_name: 'storage_deposit',
                                        args: storageArgs,
                                        gas: FT_STORAGE_DEPOSIT_GAS,
                                        deposit: storageDepositAmount
                                    }
                                ]
                            },
                        },
                        gas: ATTACHED_GAS
                    },
                }],
            },
            {
                receiverId: multisafeId,
                actions: [{
                    type: 'FunctionCall',
                    params: {
                        methodName: method,
                        args: {
                            request: {
                                receiver_id: contractName,
                                actions: [
                                    {
                                        type: 'FunctionCall',
                                        method_name: 'ft_transfer',
                                        args: transferArgs,
                                        deposit: FT_TRANSFER_DEPOSIT,
                                        gas: FT_TRANSFER_GAS,
                                    }
                                ]
                            },
                        },
                        gas: ATTACHED_GAS
                    },
                }],
            }
        ];

        // https://github.com/near/app-near/blob/master/workdir/app-near/src/constants.h#L4
        // size of both actions exceed 650kib so using signAndSendTransactions with two seperate transactions
        return await signAndSendTransactions({ transactions });
    };

    addTransferRequest = async ({ withApprove, recipientId, amount, contractName, signAndSendTransaction, signAndSendTransactions, multisafeId }) => {
        const storageAvailable = await this.isStorageBalanceAvailable({
            contractName,
            accountId: recipientId,
        });

        if (!storageAvailable) {
            try {
                return this.transferStorageDeposit({
                    withApprove,
                    contractName,
                    recipientId,
                    storageDepositAmount: FT_MINIMUM_STORAGE_BALANCE,
                    transferAmount: amount,
                    signAndSendTransactions,
                    multisafeId,
                });
            } catch (e) {
                // sic.typo in `mimimum` wording of responses, so we check substring
                // Original string was: 'attached deposit is less than the mimimum storage balance'
                if (e.message.includes('attached deposit is less than')) {
                    return this.transferStorageDeposit({
                        withApprove,
                        contractName,
                        recipientId,
                        storageDepositAmount:
                            FT_MINIMUM_STORAGE_BALANCE_LARGE,
                        transferAmount: amount,
                        signAndSendTransactions,
                        multisafeId,
                    });
                }
            }
        }

        const method = withApprove ? 'add_request_and_confirm' : 'add_request';
        const args = Buffer.from(`{"amount": "${amount}", "receiver_id": "${recipientId}", "gas": "${FT_TRANSFER_GAS}"}`)
            .toString('base64');

        return await signAndSendTransaction({
            receiverId: multisafeId,
            actions: [{
                type: 'FunctionCall',
                params: {
                    methodName: method,
                    args: {
                        request: {
                            receiver_id: contractName,
                            actions: [{
                                type: 'FunctionCall',
                                method_name: 'ft_transfer',
                                args,
                                deposit: FT_TRANSFER_DEPOSIT,
                                gas: FT_TRANSFER_GAS,
                            }]
                        },
                    },
                    gas: ADD_REQUEST_AND_CONFIRM_GAS,
                },
                
            }],
        });
    };
}
