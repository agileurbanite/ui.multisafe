import * as R from 'ramda';
import * as yup from 'yup';
import { config } from '../../near/config';

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
  account_id: 'Member Account ID must contain network connection type: e.g. alice.near, alice.testnet',
  num_confirmations: '',
  amount: 'Enter a valid amount. Minimum is 5 NEAR',
};

const patterns = {
  memberAddress:
  /^[a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]\.?(testnet|betanet|localnet|guildnet|near)?/g,
  amount: /^([5-9]|0?[1-9][0-9]+)$/g,
};

const isUserExist = async (value) => {
  const response = await fetch(config.nodeUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config.endpoint.setParams({ account_id: value })),
  });
  const result = await response.json();
  return R.has('result', result);
};

export const EditMembersPage = yup.object().shape({
  members: yup
    .array()
    .of(
      yup.object().shape({
        account_id: yup
          .string()
          .required(requiredMessageType.account_id)
          .matches(patterns.memberAddress, validationMessageType.account_id)
          .test({
            message: 'Oops! The user is not found :(',
            test: async (e) => {
              const res = await isUserExist(e)
              return res;
            },
          }),
      }),
    )
    .required(requiredMessageType.members)
    .min(1, validationMessageType.members),
});

export const EditConfirmationsPage = yup.object().shape({
  num_confirmations: yup.string().required(requiredMessageType.num_confirmations),
});
