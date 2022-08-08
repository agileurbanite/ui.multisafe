import * as yup from 'yup';

import { patterns } from '../isValidNearAccount';

const requiredMessageType = {
    recipientId: 'Please enter recipient\'s address',
    amount: 'Please enter a valid amount to send',
};

export const sendFundsSchema = yup.object().shape({
    recipientId: yup.string().required(requiredMessageType.recipientId)
        .matches(patterns.memberAddress, requiredMessageType.recipientId),
    amount: yup.string().required(requiredMessageType.amount)
        .matches(patterns.amount, requiredMessageType.amount)
});

export const transferNFTSchema = yup.object().shape({
    recipientId: yup.string().required(requiredMessageType.recipientId)
        .matches(patterns.memberAddress, requiredMessageType.recipientId),
});
