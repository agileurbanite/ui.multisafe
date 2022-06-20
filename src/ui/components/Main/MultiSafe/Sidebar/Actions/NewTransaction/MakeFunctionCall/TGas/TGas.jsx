import { TextField } from '../../../../../../general/TextField/TextField';

export const TGas = ({ control, classNames, hasError, errorMessage }) => (
  <TextField
    control={control}
    name="tGas"
    variant="outlined"
    placeholder="150"
    fullWidth
    helperText={hasError ? errorMessage : "TGas"}
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
