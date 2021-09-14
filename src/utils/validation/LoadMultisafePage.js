import * as yup from 'yup';

const requiredMessageType = {
  name: 'Please enter multisafe alias',
  multisafeId: 'Please enter a valid multisig name',
};

export const loadMultisafeSchema = yup.object().shape({
  name: yup.string().required(requiredMessageType.name),
  multisafeId: yup.string().required(requiredMessageType.multisafeId),
});
