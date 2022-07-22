import { Typography } from '@material-ui/core';
import { useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { useWalletSelector } from '../../../../../providers/WalletSelectorProvider/WalletSelectorProvider';
import FormButton from '../../../FormElements/FormButton/FormButton';
import { useStyles } from './Form.styles';

export const FormDisconnect = () => {
    const history = useHistory();
    const classes = useStyles();
    const onDisconnect = useStoreActions((actions) => actions.general.onDisconnect);
    const { selector } = useWalletSelector();

    const {
        handleSubmit,
    } = useForm({
        mode: 'all',
    });

    const onSubmit = handleSubmit(async () => {
        await onDisconnect({ history, selector });
    });

    return (
        <form autoComplete="off" className={classes.form} onSubmit={onSubmit}>
            <Typography className={classes?.description}>
        Disconnecting the account will not remove the Safe, you will be able to connect your wallet again.
            </Typography>
            <FormButton variant="contained" className={classes.submitButton}>
                Disconnect Account
            </FormButton>
        </form>
    );
};
