import { TextField } from '@ui/components/Main/general/TextField/TextField';

export const Arguments = ({ control, classNames, hasError, errorMessage }) => (
    <TextField
        control={control}
        name='args'
        variant='outlined'
        placeholder={'{\"account_id\": \"satoshi.near\"}'}
        fullWidth
        helperText={hasError ? errorMessage : 'Arguments (JSON)'}
        className={classNames.textField}
        error={hasError}
        multiline
        InputProps={{
            classes: {
                root: classNames.textFieldInputRoot,
                notchedOutline: classNames.textFieldInputNotchedOutline,
            },
        }}
    />
);
