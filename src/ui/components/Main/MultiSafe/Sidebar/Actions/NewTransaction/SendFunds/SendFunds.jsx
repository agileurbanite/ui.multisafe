import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import cn from 'classnames';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import isValidNearAccount from '../../../../../../../../utils/isValidNearAccount';
import { sendFundsSchema } from '../../../../../../../../utils/validation/SendFundsModal';
import { useWalletSelector } from '../../../../../../../providers/WalletSelectorProvider/WalletSelectorProvider';
import { Checkbox } from '../../../../../../general/Checkbox/Checkbox';
import FormButton from '../../../../../FormElements/FormButton/FormButton';
import { Amount } from './Amount/Amount';
import { Recipient } from './Recipient/Recipient';
import { useStyles } from './SendFunds.styles';

export const SendFunds = forwardRef(({ onClose, tabIndex }, ref) => {
    const [tokenName, setTokenName] = useState('near');
    const onTransferTokens = useStoreActions((actions) => actions.multisafe.onTransferTokens);
    const fungibleTokens = useStoreState((store) => store.multisafe.general.fungibleTokens);

    const { control, handleSubmit, setValue, reset, setError, setFocus, formState: { errors, isValid, isDirty } } = useForm({
        resolver: yupResolver(sendFundsSchema),
        mode: 'all',
    });
    const classes = useStyles();
    
    const { selector, selectedWalletId, accountId } = useWalletSelector();

    const onSubmit = handleSubmit(async (data) => {
        const isAccountValid = await isValidNearAccount(data.recipientId);
        if (!isAccountValid) {
            setError('recipientId', {message: 'Oops! The user does not exist :('});
            setFocus('recipientId');
            return;
        }
        
        const token = fungibleTokens.find(({name}) => name === tokenName) 
            ? fungibleTokens.find(({name}) => name === tokenName) 
            : undefined;
        onTransferTokens({ data, onClose, token, selector, selectedWalletId, accountId });
        reset(data);
    });

    return (
        <div className={classes.wrapper}>
            <form className={classes.form} onSubmit={onSubmit}>
                <Amount
                    control={control}
                    classNames={classes}
                    setValue={setValue}
                    tokenName={tokenName}
                    setTokenName={setTokenName}
                    hasError={!!errors?.amount}
                    errorMessage={!!errors?.amount && errors?.amount?.message}
                />
                <Recipient
                    control={control}
                    classNames={classes}
                    hasError={!!errors?.recipientId}
                    errorMessage={errors?.recipientId?.message}
                />
                <Checkbox
                    control={control}
                    name="withApprove"
                    label="Approve transaction"
                    muiClasses={{ label: classes.checkboxLabel }}
                    defaultValue
                    color="primary"
                />
                <div className={classes.footer}>
                    <Button color="secondary" className={classes.cancel} onClick={onClose}>
                        Cancel
                    </Button>
                    <FormButton disabled={!isValid || !isDirty} className={cn(classes.cancel, classes.send)}>
                        Send
                    </FormButton>
                </div>
            </form>
        </div>
    );
});
