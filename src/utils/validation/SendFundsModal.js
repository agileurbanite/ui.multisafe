import * as yup from 'yup';

const requiredMessageType = {
    recipientId: 'Please enter recipient\'s address',
    amount: 'Please enter a valid amount to send',
};

export const sendFundsSchema = yup.object().shape({
    recipientId: yup.string().required(requiredMessageType.recipientId),
    amount: yup.string().required(requiredMessageType.amount),
});

export const transferNFTSchema = yup.object().shape({
    recipientId: yup.string().required(requiredMessageType.recipientId)
});
