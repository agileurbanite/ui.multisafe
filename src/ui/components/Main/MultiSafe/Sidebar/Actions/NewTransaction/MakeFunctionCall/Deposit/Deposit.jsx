import { TextField } from '../../../../../../general/TextField/TextField';

export const Deposit = ({ control, classNames, hasError, errorMessage }) => (
  <TextField
    control={control}
    name="deposit"
    variant="outlined"
    placeholder="1"
    fullWidth
    helperText={hasError ? errorMessage : "Deposit"}
    className={classNames.textField}
    error={hasError}
    InputProps={{
      classes: {
        root: classNames.textFieldInputRoot,
        notchedOutline: classNames.textFieldInputNotchedOutline,
      },
    }}
  />
);
