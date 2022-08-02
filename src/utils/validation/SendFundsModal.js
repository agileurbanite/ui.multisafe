import * as yup from 'yup';

import isValidNearAccount, { patterns } from '../isValidNearAccount';

const requiredMessageType = {
    recipientId: 'Please enter recipient\'s address',
    amount: 'Please enter a valid amount to send',
};

export const sendFundsSchema = yup.object().shape({
    recipientId: yup.string().required(requiredMessageType.recipientId)
        .matches(patterns.memberAddress, requiredMessageType.recipientId)
        .test({
            message: 'Oops! The user does not exist :(',
            test: async (e) => {
                const res = await isValidNearAccount(e);
                return res;
            },
        }),
    amount: yup.string().required(requiredMessageType.amount)
        .matches(patterns.amount, requiredMessageType.amount)
});

export const transferNFTSchema = yup.object().shape({
    recipientId: yup.string().required(requiredMessageType.recipientId)
        .test({
            message: 'Oops! The user does not exist :(',
            test: async (e) => {
                const res = await isValidNearAccount(e);
                return res;
            },
        })
});
