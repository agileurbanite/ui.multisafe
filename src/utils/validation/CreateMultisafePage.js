import * as yup from 'yup';

import { config } from '../../near/config';
import isValidNearAccount, { patterns } from '../isValidNearAccount';

const requiredMessageType = {
    name: 'Please enter multisafe name',
    multisafeId: 'Please enter multisafe ID',
    members: 'Members needed',
    account_id: 'Please enter a member\'s address',
    num_confirmations: 'Please select desired number of confirmations',
    amount: 'Please enter multisafe budget',
};
const validationMessageType = {
    name: 'Name must be at least 4 characters long',
    multisafeId: 'Multisafe ID must be at least 1 character long',
    members: 'At least 1 member must be present',
    account_id: 'The account ID must include a Top Level Account such as .near or contain exactly 64 characters.',
    account_id_too_short: 'Account ID must be greater than 1 character',
    account_id_too_long: 'Account ID must be shorter than 64 characters',
    num_confirmations: '',
    amount: 'Enter a valid amount. Minimum is 5 NEAR',
};

export const createMultisafeSchema = yup.object().shape({
    name: yup.string().required(requiredMessageType.name),
    multisafeId: yup.string().required(requiredMessageType.multisafeId)
        .test({
            message: 'Account already exists.',
            test: async (multisafeId) => {
                const response = await isValidNearAccount(`${multisafeId}.multisafe.${config.networkId}`);
                return !response;
            },
        }),
    members: yup
        .array()
        .of(
            yup.object().shape({
                account_id: yup
                    .string()
                    .required(requiredMessageType.account_id)
                    .matches(patterns.accountId, validationMessageType.account_id)
                    .min(2, validationMessageType.account_id_too_short)
                    .max(64, validationMessageType.account_id_too_long)
                    .test({
                        message: 'Oops! The user does not exist :(',
                        test: async (e) => {
                            return isValidNearAccount(e);
                        },
                    }),
            }),
        )
        .required(requiredMessageType.members)
        .min(1, validationMessageType.members),
    num_confirmations: yup.string().required(requiredMessageType.num_confirmations),
    amount: yup
        .string()
        .required(requiredMessageType.amount)
        .matches(patterns.createMultisafeAmount, validationMessageType.amount),
});
