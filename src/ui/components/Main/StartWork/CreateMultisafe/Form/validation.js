import { object, string, array } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { debounce } from '../../../../../../utils/debounce';
import { getMultisafeAccountId } from '../../../../../../utils/getMultisafeAccountId';
import { isAccountExist } from '../../../../../../utils/isAccountExist';

const errors = {
  invalidAccountFormat: 'Please enter valid account ID',
  name: {
    required: 'Please enter multisafe name',
  },
  multisafeId: {
    required: 'Please enter a valid multisafe ID',
    alreadyTaken: 'Sorry, but this ID has been already taken',
  },
  members: {
    min: 'Multisafe have to contain at least 1 member',
    isUserExists: 'No account found with such ID',
  },
  amount: {
    required: 'Please enter multisafe budget',
    invalidFormat: 'Enter a valid amount. Minimum is 5 NEAR',
  },
};

const regex = {
  accountId: /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/g,
  amount: /^[5-9]*(\.\d+)?$/g,
};

const name = string().required(errors.name.required);

const multisafeId = string()
  .required(errors.multisafeId.required)
  .test(
    'is-multisafe-exists',
    errors.multisafeId.alreadyTaken,
    debounce(
      async (value, { options }) =>
        !(await isAccountExist({
          near: options.context.near,
          accountId: getMultisafeAccountId(value),
        })),
      350,
    ),
  );

const members = array().of(
  object().shape({
    account_id: string()
      .required(errors.invalidAccountFormat)
      .matches(regex.accountId, errors.invalidAccountFormat),
  }),
);

const amount = string()
  .required(errors.amount.required)
  .matches(regex.amount, errors.amount.invalidFormat);

const schema = object().shape({
  name,
  multisafeId,
  members,
  amount,
});

export const resolver = yupResolver(schema);
