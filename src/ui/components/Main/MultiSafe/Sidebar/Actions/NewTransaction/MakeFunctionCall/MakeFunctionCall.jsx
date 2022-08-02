import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Paper } from '@material-ui/core';
import cn from 'classnames';
import { useStoreActions } from 'easy-peasy';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';

import { makeFunctionCallSchema } from '../../../../../../../../utils/validation/makeFunctionCallModal';
import { useWalletSelector } from '../../../../../../../providers/WalletSelectorProvider/WalletSelectorProvider';
import { Checkbox } from '../../../../../../general/Checkbox/Checkbox';
import FormButton from '../../../../../FormElements/FormButton/FormButton';
import { Arguments } from './arguments/Arguments';
import { Deposit } from './Deposit/Deposit';
import { useStyles } from './MakeFunctionCall.styles';
import { MethodName } from './MethodName/MethodName';
import { SmartContractAddress } from './SmartContractAddress/SmartContractAddress';
import { TGas } from './TGas/TGas';


export const MakeFunctionCall = forwardRef(({ onClose, tabIndex }, ref) => {
    const onMakeFunctionCall = useStoreActions((actions) => actions.multisafe.onMakeFunctionCall);
    const { selector, selectedWalletId } = useWalletSelector();
    const { control, handleSubmit, reset, formState: { errors, isValid, isDirty } } = useForm({
        resolver: yupResolver(makeFunctionCallSchema),
        mode: 'all',
    });
    const classes = useStyles();

    const onSubmit = handleSubmit((data) => {
        onMakeFunctionCall({ data, onClose, selector, selectedWalletId });
        reset(data);
    });

    return (
        <Paper className={classes.container} ref={ref} tabIndex={tabIndex} elevation={5}>
            <div className={classes.wrapper}>
                <h2 className={classes.header}>Make function call</h2>
                <form className={classes.form} onSubmit={onSubmit}>
                    <SmartContractAddress
                        control={control}
                        classNames={classes}
                        hasError={!!errors?.smartContractAddress}
                        errorMessage={errors?.smartContractAddress?.message}
                    />
                    <MethodName
                        control={control}
                        classNames={classes}
                        hasError={!!errors?.methodName}
                        errorMessage={errors?.methodName?.message}
                    />
                    <Arguments
                        control={control}
                        classNames={classes}
                        hasError={!!errors?.args}
                        errorMessage={errors?.args?.message}
                    />
                    <Deposit
                        control={control}
                        classNames={classes}
                        hasError={!!errors?.deposit}
                        errorMessage={errors?.deposit?.message}
                    />
                    <TGas
                        control={control}
                        classNames={classes}
                        hasError={!!errors?.tGas}
                        errorMessage={errors?.tGas?.message}
                    />
                    <Checkbox
                        control={control}
                        name='withApprove'
                        label='Approve transaction'
                        muiClasses={{ label: classes.checkboxLabel }}
                        defaultValue
                        color='primary'
                    />
                    <div className={classes.footer}>
                        <Button color='secondary' className={classes.cancel} onClick={onClose}>
                            Cancel
                        </Button>
                        <FormButton disabled={!isValid || !isDirty} className={cn(classes.cancel, classes.send)}>
                        Make function call
                        </FormButton>
                    </div>
                </form>
            </div>
        </Paper>
    );
});
