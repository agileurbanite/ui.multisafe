import { TextField } from '../../../../../../general/TextField/TextField';

export const Recipient = ({ control, classNames, hasError, errorMessage }) => (
    <TextField
        control={control}
        name="recipientId"
        variant="outlined"
        placeholder="Recipient*"
        fullWidth
        helperText={hasError ? errorMessage : 'Recipient Account ID'}
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
