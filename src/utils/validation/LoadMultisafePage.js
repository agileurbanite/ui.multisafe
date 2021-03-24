import * as yup from 'yup';

const requiredMessageType = {
  name: "Please enter multisafe alias",
  multisafeId: "Please enter a valid multisig name"
};
const validationMessageType = {
  name: "Name must be at least 4 characters long",
  multisafeId: "Multisig name must match pattern 'MULTISAFE_NAME.CONTRACT_ID'"
};

const patterns = {
  multisafeId: /^[a-zA-Z0-9][a-zA-Z0-9-]{3,64}[a-zA-Z0-9]\.[a-zA-Z0-9-]{4,}$/g,
};

export const loadMultisafeSchema = yup.object().shape({
  name: yup.string().required(requiredMessageType.name).min(4, validationMessageType.name),
  multisafeId: yup.string().required(requiredMessageType.multisafeId).matches(patterns.multisafeId, validationMessageType.multisafeId)
});
