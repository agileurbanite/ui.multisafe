import * as yup from 'yup';

const requiredMessageType = {
  recipientId: "Please enter recipient's address",
  amount: 'Please enter a valid multisig name',
};
const validationMessageType = {
  recipientId:
    'Member address must contain network connection type: e.g. alice.near, alice.testnet',
  amount: "Enter a valid amount you want to send",
};

const patterns = {
  recipientId: /\.(testnet|betanet|localnet|near)/g,
  amount: /^([1-9]|0?[1-9][0-9]+)$/g,
};

export const sendFundsSchema = yup.object().shape({
  recipientId: yup
    .string()
    .required(requiredMessageType.recipientId)
    .matches(patterns.recipientId, validationMessageType.recipientId),
  amount: yup
    .string()
    .required(requiredMessageType.amount)
    .matches(patterns.amount, validationMessageType.amount),
});
