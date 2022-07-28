import * as yup from 'yup';

import isValidNearAccount from '../isValidNearAccount';

const requiredMessageType = {
    recipientId: 'Please enter recipient\'s address',
    amount: 'Please enter a valid amount to send',
};

const patterns = {
    memberAddress: /^[a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]\.?(testnet|betanet|localnet|guildnet|near)?/g,
    amount: /^([5-9]|0?[1-9][0-9]+)$/g,
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
    amount: yup.string()
        .required(requiredMessageType.amount)
        .matches(patterns.amount, requiredMessageType.amount),
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
