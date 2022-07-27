import { Typography } from '@material-ui/core';
import { useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import FormButton from '../../../FormElements/FormButton/FormButton';
import { useStyles } from './Form.styles';

export const FormDisconnect = () => {
    const history = useHistory();
    const classes = useStyles();
    const onDisconnect = useStoreActions((actions) => actions.general.onDisconnect);

    const {
        handleSubmit,
        formState: {isValid}
    } = useForm({
        mode: 'all',
    });

    const onSubmit = handleSubmit(() => onDisconnect({ history }));

    return (
        <form autoComplete="off" className={classes.form} onSubmit={onSubmit}>
            <Typography className={classes?.description}>
        Disconnecting the account will not remove the Safe, you will be able to connect your wallet again.
            </Typography>
            <FormButton disabled={!isValid} variant="contained" className={classes.submitButton}>
                Disconnect Account
            </FormButton>
        </form>
    );
};
