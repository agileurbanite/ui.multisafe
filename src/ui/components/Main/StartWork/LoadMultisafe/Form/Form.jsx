import { Button, Divider, Typography } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { TextField } from '../../../general/TextField/TextField';
import { useStyles } from './Form.styles';
import { resolver } from './validations';

export const Form = () => {
    const near = useStoreState((state) => state.general.entities.near);
    const multisafes = useStoreState((state) => state.multisafe.multisafes);
    const onLoadMultisafe = useStoreActions((actions) => actions.startWork.onLoadMultisafe);
    const { control, handleSubmit, formState } = useForm({
        resolver,
        context: { near, multisafes: new Set(multisafes.map((multisafe) => multisafe.multisafeId)) },
    });
    const { push } = useHistory();
    const classes = useStyles();

    const onSubmit = handleSubmit((data) => {
        onLoadMultisafe({ data, push });
    });

    return (
        <form className={classes.form} onSubmit={onSubmit}>
            <TextField
                control={control}
                name="name"
                variant="outlined"
                placeholder="MultiSafe Name"
                className={classes.textField}
                error={formState.errors?.name}
                helperText={formState.errors?.name?.message}
            />
            <TextField
                control={control}
                name="multisafeId"
                variant="outlined"
                placeholder="MultiSafe Account ID"
                className={classes.textField}
                error={formState.errors?.multisafeId}
                helperText={formState.errors?.multisafeId?.message}
            />
            <Typography className={classes.terms}>
        By continuing you consent to the terms of use and privacy policy.
            </Typography>
            <Divider className={classes.divider} />
            <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
        Load Multi Safe
            </Button>
        </form>
    );
};
