import { TextField } from '@ui/components/Main/general/TextField/TextField';

export const SmartContractAddress = ({ control, classNames, hasError, errorMessage }) => (
    <TextField
        control={control}
        name='smartContractAddress'
        variant='outlined'
        placeholder='x.paras.near'
        fullWidth
        helperText={hasError ? errorMessage : 'Smart Contract Address'}
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
