import * as nearApiJs from 'near-api-js';

import { config } from '../near/config';

const {
    utils: {
        format: { parseNearAmount },
    },
} = nearApiJs;

// account creation costs 0.00125 NEAR for storage, 0.00000000003 NEAR for gas
// https://docs.near.org/docs/api/naj-cookbook#wrap-and-unwrap-near
const FT_MINIMUM_STORAGE_BALANCE = parseNearAmount(config.gas.storage_deposit);
// FT_MINIMUM_STORAGE_BALANCE: nUSDC, nUSDT require minimum 0.0125 NEAR. Came to this conclusion using trial and error.
export const FT_MINIMUM_STORAGE_BALANCE_LARGE = parseNearAmount(config.gas.storage_deposit_large);
const FT_STORAGE_DEPOSIT_GAS = parseNearAmount(config.gas.storage_gas);

// set this to the same value as we use for creating an account and the remainder is refunded
const FT_TRANSFER_GAS = parseNearAmount(config.gas.transfer);

const ADD_REQUEST_AND_CONFIRM_GAS = config.gas.add_and_confirm;
const GAS_FOR_TWO_CALLS = config.gas.two_calls;

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
    }

    transferStorageDeposit = async ({
        withApprove,
        multisafeContract,
        contractName,
        recipientId,
        storageDepositAmount,
        transferAmount,
    }) => {
        const method = withApprove ? 'add_request_and_confirm' : 'add_request';
        const storageArgs = Buffer.from(`{"account_id": "${recipientId}", "registration_only": true}`).toString('base64');
        const transferArgs = Buffer.from(`{"amount": "${transferAmount}", "receiver_id": "${recipientId}"}`)
            .toString('base64');
        return multisafeContract[method]({
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
                        },
                        {
                            type: 'FunctionCall',
                            method_name: 'ft_transfer',
                            args: transferArgs,
                            deposit: FT_TRANSFER_DEPOSIT,
                            gas: FT_TRANSFER_GAS,
                        }
                    ]},
            },
            gas: GAS_FOR_TWO_CALLS
        });
    }

    addTransferRequest = async ({ multisafeContract, withApprove, recipientId, amount, contractName }) => {
        const storageAvailable = await this.isStorageBalanceAvailable({
            contractName,
            accountId: recipientId,
        });
        if (!storageAvailable) {
            try {
                return this.transferStorageDeposit({
                    withApprove,
                    multisafeContract,
                    contractName,
                    recipientId,
                    storageDepositAmount: FT_MINIMUM_STORAGE_BALANCE,
                    transferAmount: amount,
                });
            } catch (e) {
                // sic.typo in `mimimum` wording of responses, so we check substring
                // Original string was: 'attached deposit is less than the mimimum storage balance'
                if (e.message.includes('attached deposit is less than')) {
                    return this.transferStorageDeposit({
                        withApprove,
                        multisafeContract,
                        contractName,
                        recipientId,
                        storageDepositAmount:
                            FT_MINIMUM_STORAGE_BALANCE_LARGE,
                        transferAmount: amount
                    });
                }
            }
        }
        const method = withApprove ? 'add_request_and_confirm' : 'add_request';
        const args = Buffer.from(`{"amount": "${amount}", "receiver_id": "${recipientId}"}`)
            .toString('base64');

        return multisafeContract[method](
            {
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
                gas: ADD_REQUEST_AND_CONFIRM_GAS 
            },
        );
    };
}
