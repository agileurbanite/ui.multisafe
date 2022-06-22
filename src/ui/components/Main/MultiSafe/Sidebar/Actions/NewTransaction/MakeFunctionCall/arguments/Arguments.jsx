import { TextField } from '../../../../../../general/TextField/TextField';

const placeHolder = `{'account_id': 'satoshi.near'}`; // eslint-disable-line

export const Arguments = ({ control, classNames, hasError, errorMessage }) => (
    <TextField
        control={control}
        name='args'
        variant='outlined'
        placeholder={placeHolder}
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
