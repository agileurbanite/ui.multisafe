import * as yup from 'yup';

export const editSchema = yup.object().shape({
  name: yup.string().required('Please enter Multisafe Name is required'),
});
