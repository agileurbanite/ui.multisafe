import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import cn from 'classnames';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { sendFundsSchema } from '../../../../../../../../utils/validation/SendFundsModal';
import { Checkbox } from '../../../../../../general/Checkbox/Checkbox';
import { Amount } from './Amount/Amount';
import { Recipient } from './Recipient/Recipient';
import { useStyles } from './SendFunds.styles';

export const SendFunds = forwardRef(({ onClose, tabIndex }, ref) => {
    const [tokenName, setTokenName] = useState('near');
    const onTransferTokens = useStoreActions((actions) => actions.multisafe.onTransferTokens);
    const fungibleTokens = useStoreState((store) => store.multisafe.general.fungibleTokens);

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(sendFundsSchema),
        mode: 'all',
    });
    const classes = useStyles();

    const onSubmit = handleSubmit((data) => {
        const token = fungibleTokens.find(({name}) => name === tokenName) 
            ? fungibleTokens.find(({name}) => name === tokenName) 
            : undefined;
        onTransferTokens({ data, onClose, token});
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
                    <Button type="submit" color="primary" className={cn(classes.cancel, classes.send)}>
                        Send
                    </Button>
                </div>
            </form>
        </div>
    );
});
