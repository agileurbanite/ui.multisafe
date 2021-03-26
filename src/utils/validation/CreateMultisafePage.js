import * as yup from 'yup';

const requiredMessageType = {
  name: 'Please enter multisafe name',
  multisafeId: 'Please enter multisafe ID',
  members: 'Members needed',
  account_id: "Please enter member's address",
  num_confirmations: 'Please select desired number of confirmations',
  amount: 'Please enter multisafe budget',
};
const validationMessageType = {
  name: 'Name must be at least 4 characters long',
  multisafeId: 'Multisafe ID must be at least 1 character long',
  members: 'At least 1 member must be present',
  account_id: 'Member address must contain network connection type: e.g. alice.near, alice.testnet',
  num_confirmations: '',
  amount: 'Enter a valid amount. Minimum is 5 NEAR',
};

const patterns = {
  memberAddress: /\.(testnet|betanet|localnet|near)/g,
  amount: /^([5-9]|0?[1-9][0-9]+)$/g,
};

export const createMultisafeSchema = yup.object().shape({
  name: yup.string().required(requiredMessageType.name).min(4, validationMessageType.name),
  multisafeId: yup
    .string()
    .required(requiredMessageType.multisafeId)
    .min(1, validationMessageType.multisafeId),
  members: yup
    .array()
    .of(
      yup.object().shape({
        account_id: yup
          .string()
          .required(requiredMessageType.account_id)
          .matches(patterns.memberAddress, validationMessageType.account_id),
      }),
    )
    .required(requiredMessageType.members)
    .min(1, validationMessageType.members),
  num_confirmations: yup.string().required(requiredMessageType.num_confirmations),
  amount: yup
    .string()
    .required(requiredMessageType.amount)
    .matches(patterns.amount, validationMessageType.amount),
});
