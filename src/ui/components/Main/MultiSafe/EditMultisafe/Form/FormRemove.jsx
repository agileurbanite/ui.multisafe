import { Typography } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import FormButton from '../../../FormElements/FormButton/FormButton';
import { useStyles } from './Form.styles';

export const FormRemove = () => {
    const history = useHistory();
    const classes = useStyles();
    const onDisconnect = useStoreActions((actions) => actions.general.onDisconnect);
    const name = useStoreState((state) => state.multisafe.general.name);

    const {
        handleSubmit,
    } = useForm({
        mode: 'all',
    });

    const onSubmit = handleSubmit(() => onDisconnect({ history }));

    return (
        <form autoComplete="off" className={classes.form} onSubmit={onSubmit}>
            <Typography className={classes?.description}>
                {`Are you sure to remove "${name}" from list?`}
            </Typography>
            <Typography className={classes?.description}>
                Notice that it will be removed only locally from your browser - you won&apos;t delete it from the blockchain.
            </Typography>
            <FormButton variant="contained" className={classes.submitButton}>
            Remove Multi Safe
            </FormButton>
        </form>
    );
};
