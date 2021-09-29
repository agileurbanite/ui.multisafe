import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getMultisafeAccountId } from '../../../../../../utils/getMultisafeAccountId';
import { debounce } from '../../../../../../utils/debounce';
import { isAccountExist } from '../../../../../../utils/isAccountExist';

const errors = {
  name: 'Please enter multisafe local name',
  multisafeId: 'Please enter a valid multisafe name',
  isMultisafeExists: 'There is no multisafe with such ID',
  isMultisafeLoaded: 'This multisafe has been loaded already',
};

export const schema = yup.object().shape({
  name: yup.string().required(errors.name),
  multisafeId: yup
    .string()
    .required(errors.multisafeId)
    .test(
      'is-multisafe-loaded',
      errors.isMultisafeLoaded,
      (value, { options }) => !options.context.multisafes.has(getMultisafeAccountId(value)),
    )
    .test(
      'is-multisafe-exists',
      errors.isMultisafeExists,
      debounce(
        async (value, { options }) =>
          isAccountExist({
            near: options.context.near,
            accountId: getMultisafeAccountId(value),
          }),
        350,
      ),
    ),
});

export const resolver = yupResolver(schema);
