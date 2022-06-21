import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { createMultisafeSchema } from '../../../../../../utils/validation/CreateMultisafePage';
import { AccountId } from '../../../FormElements/AccountId/AccountId';
import { Amount } from '../../../FormElements/Amount/Amount';
import { Confirmations } from '../../../FormElements/Confirmations/Confirmations';
import { MembersField } from '../../../FormElements/MembersField/MembersField';
import { MultisafeName } from '../../../FormElements/MultisafeName/MultisafeName';
import { useStyles } from './Form.styles';

export const Form = () => {
    const accountId = useStoreState((store) => store.general.user.accountId);
    const onCreateMultisafe = useStoreActions((actions) => actions.startWork.onCreateMultisafe);
    const history = useHistory();
    const classes = useStyles();

    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createMultisafeSchema),
        mode: 'all',
        defaultValues: {
            members: [{ account_id: accountId }],
            num_confirmations: '1',
        },
    });

    const onSubmit = handleSubmit((data) => onCreateMultisafe({ data, history }));

    return (
        <form autoComplete="off" className={classes.form} onSubmit={onSubmit}>
            <MultisafeName
                control={control}
                classNames={classes}
                hasError={!!errors?.name}
                errorMessage={!!errors?.name && errors?.name?.message}
            />
            <AccountId
                control={control}
                classNames={classes}
                hasError={!!errors?.multisafeId}
                errorMessage={!!errors?.multisafeId && errors?.multisafeId?.message}
            />
            <MembersField
                control={control}
                getValues={getValues}
                classNames={classes}
                name="members"
                errors={errors}
            />
            <Confirmations
                control={control}
                classNames={classes}
                hasError={!!errors?.num_confirmations}
                errorMessage={!!errors?.num_confirmations && errors?.num_confirmations?.message}
            />
            <Amount
                control={control}
                classNames={classes}
                hasError={!!errors?.amount}
                errorMessage={!!errors?.amount && errors?.amount?.message}
            />
            <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
        Create Multi Safe
            </Button>
        </form>
    );
};
