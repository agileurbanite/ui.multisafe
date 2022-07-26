import { TextField } from '@ui/components/Main/general/TextField/TextField';

export const MethodName = ({ control, classNames, hasError, errorMessage }) => (
    <TextField
        control={control}
        name='methodName'
        variant='outlined'
        placeholder='nft_buy'
        fullWidth
        helperText={hasError ? errorMessage : 'Method Name'}
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
