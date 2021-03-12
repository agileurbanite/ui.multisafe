import { TextField } from '../../../../../../general/TextField/TextField';

export const Recipient = ({ control, classNames }) => (
  <TextField
    control={control}
    name="recipientId"
    variant="outlined"
    placeholder="Recipient*"
    fullWidth
    helperText="Recipient Account ID"
    className={classNames.textField}
    InputProps={{
      classes: {
        root: classNames.textFieldInputRoot,
        notchedOutline: classNames.textFieldInputNotchedOutline,
      },
    }}
  />
);
