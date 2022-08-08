import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Paper, TextField } from '@material-ui/core';
import { Checkbox } from '@ui/components/general/Checkbox/Checkbox';
import { useWalletSelector } from '@ui/providers/WalletSelectorProvider/WalletSelectorProvider';
import isValidNearAccount from '@utils/isValidNearAccount';
import { transferNFTSchema } from '@utils/validation/SendFundsModal';
import cn from 'classnames';
import { useStoreActions } from 'easy-peasy';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';

import FormButton from '../../../FormElements/FormButton/FormButton';
import { Recipient } from '../../Sidebar/Actions/NewTransaction/SendFunds/Recipient/Recipient';
import { useStyles } from '../../Sidebar/Actions/NewTransaction/SendFunds/SendFunds.styles';

       
export const TransferNFT = forwardRef(({ onClose, tabIndex, tokenId, contractName, tokenName }, ref) => {
    const { selector, selectedWalletId } = useWalletSelector();
    const onTransferNFT = useStoreActions((actions) => actions.multisafe.onTransferNFT);

    const { control, handleSubmit, reset, setError, setFocus, formState: {isValid, isDirty, errors} } = useForm({
        resolver: yupResolver(transferNFTSchema),
        mode: 'all',
    });
    const classes = useStyles();

    const onSubmit = handleSubmit(async (data) => {
        const isAccountValid = await isValidNearAccount(data.recipientId);
        if (!isAccountValid) {
            setError('recipientId', {message: 'Oops! The user does not exist :('});
            setFocus('recipientId');
            return;
        }

        onTransferNFT({ data, onClose, tokenId, contractName, selector, selectedWalletId });
        reset(data);
    });

    return (
        <Paper className={classes.container} ref={ref} tabIndex={tabIndex} elevation={5}>
            <div className={classes.wrapper}>
                <h2 className={classes.header}>Send NFT</h2>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Recipient
                        control={control}
                        classNames={classes}
                        hasError={!!errors?.recipientId}
                        errorMessage={errors?.recipientId?.message}
                    />
                    <TextField
                        disabled
                        className={classes.readOnlyField}
                        id="filled-disabled"
                        label="NFT to Send"
                        defaultValue={tokenName}
                        variant="filled"
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
        </Paper>
    );
});
