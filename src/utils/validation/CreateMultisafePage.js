import * as yup from 'yup';

const requiredMessageType = {
  name: 'Please enter multisafe name',
  members: 'Members needed',
  account_id: "Please enter member's address",
  num_confirmations: 'Please select desired number of confirmations',
  amount: 'Please enter multisafe budget',
};
const validationMessageType = {
  name: 'Name must be at least 4 characters long',
  members: 'At least 1 member must be present',
  account_id: "Member's name must contain at least 2 characters long",
  num_confirmations: '',
  amount: 'Recommended amount - 5 NEAR',
};

export const createMultisafeSchema = yup.object().shape({
  name: yup.string().required(requiredMessageType.name).min(4, validationMessageType.name),
  members: yup
    .array()
    .of(
      yup.object().shape({
        account_id: yup
          .string()
          .required(requiredMessageType.account_id)
          .min(2, validationMessageType.account_id),
      }),
    )
    .required(requiredMessageType.members)
    .min(1, validationMessageType.members),
  num_confirmations: yup.string().required(requiredMessageType.num_confirmations),
  amount: yup.number().required(requiredMessageType.amount).min(5, validationMessageType.amount),
});
