import * as yup from 'yup';

import { patterns } from '../isValidNearAccount';

const requiredMessageType = {
    recipientId: 'Please enter a valid recipient address',
    amount: 'Please enter a valid amount to send',
};

const validationMessageType = {
    account_id_too_short: 'Account ID must be greater than 1 character',
    account_id_too_long: 'Account ID must be shorter than 64 characters',
};

export const sendFundsSchema = yup.object().shape({
    recipientId: yup.string().required(requiredMessageType.recipientId)
        .matches(patterns.accountId, requiredMessageType.recipientId)
        .min(2, validationMessageType.account_id_too_short)
        .max(64, validationMessageType.account_id_too_long),
    amount: yup.string()
        .required(requiredMessageType.amount)
        .matches(patterns.amount, requiredMessageType.amount)
});

export const transferNFTSchema = yup.object().shape({
    recipientId: yup.string()
        .required(requiredMessageType.recipientId)
        .matches(patterns.accountId, requiredMessageType.recipientId)
        .min(2, validationMessageType.account_id_too_short)
        .max(64, validationMessageType.account_id_too_long),
});
