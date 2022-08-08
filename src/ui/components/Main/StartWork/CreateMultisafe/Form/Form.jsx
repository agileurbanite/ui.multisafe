import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@material-ui/core';
import { AccountId } from '@ui/components/Main/FormElements/AccountId/AccountId';
import { Amount } from '@ui/components/Main/FormElements/Amount/Amount';
import { Confirmations } from '@ui/components/Main/FormElements/Confirmations/Confirmations';
import { MembersField } from '@ui/components/Main/FormElements/MembersField/MembersField';
import { MultisafeName } from '@ui/components/Main/FormElements/MultisafeName/MultisafeName';
import { createMultisafeSchema } from '@utils/validation/CreateMultisafePage';
import { Typography } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { useWalletSelector } from '@ui/providers/WalletSelectorProvider/WalletSelectorProvider';
import FormButton from '../../../FormElements/FormButton/FormButton';
import { useStyles } from './Form.styles';

export const Form = () => {
    const accountId = useStoreState((store) => store.general.user.accountId);
    const onCreateMultisafe = useStoreActions((actions) => actions.startWork.onCreateMultisafe);
    const history = useHistory();
    const classes = useStyles();
    const { selectedWalletId } = useWalletSelector();

    const {
        control,
        handleSubmit,
        getValues,
        reset,
        formState: { errors, isValid, isDirty },
    } = useForm({
        resolver: yupResolver(createMultisafeSchema),
        mode: 'onBlur',
        defaultValues: {
            members: [{ account_id: accountId }],
            num_confirmations: '1',
            amount: '5' 
        },
    });

    const onSubmit = handleSubmit((data) => {
        onCreateMultisafe({ data, history, selectedWalletId });
        reset(data);
    });

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
            <Typography className={classes.policy}>
                By continuing you consent to the terms of use and privacy policy.
            </Typography>
            <FormButton disabled={!isValid || !isDirty} variant="contained" className={classes.submitButton}>
            Create Multi Safe
            </FormButton>
        </form>
    );
};
