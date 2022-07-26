import { TextField } from '@ui/components/Main/general/TextField/TextField';

import { useStyles } from './MultisafeName.styles';

export const MultisafeName = ({ control, hasError, errorMessage, name }) => {
    const classes = useStyles();

    return (
        <TextField
            defaultValue={name}
            control={control}
            name="name"
            variant="outlined"
            placeholder="MultisafeName*"
            fullWidth
            helperText={hasError ? errorMessage : 'Change multisafe name'}
            className={classes.textField}
            error={hasError}
            InputProps={{
                classes: {
                    root: classes.textFieldInputRoot,
                    notchedOutline: classes.textFieldInputNotchedOutline,
                },
            }}
        />
    );
};
