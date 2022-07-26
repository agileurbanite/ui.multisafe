import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Paper, TextField } from '@material-ui/core';
import { Checkbox } from '@ui/components/general/Checkbox/Checkbox';
import { transferNFTSchema } from '@utils/validation/SendFundsModal';
import cn from 'classnames';
import { useStoreActions } from 'easy-peasy';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';

import { Recipient } from '../../Sidebar/Actions/NewTransaction/SendFunds/Recipient/Recipient';
import { useStyles } from '../../Sidebar/Actions/NewTransaction/SendFunds/SendFunds.styles';

export const TransferNFT = forwardRef(({ onClose, tabIndex, tokenId, contractName, tokenName }, ref) => {
    const onTransferNFT = useStoreActions((actions) => actions.multisafe.onTransferNFT);

    const { control, handleSubmit, errors } = useForm({
        resolver: yupResolver(transferNFTSchema),
        mode: 'all',
    });
    const classes = useStyles();

    const onSubmit = handleSubmit((data) => {
        onTransferNFT({ data, onClose, tokenId, contractName });
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
                        errorMessage={!!errors?.recipientId && errors?.recipientId?.message}
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
                        <Button type="submit" color="primary" className={cn(classes.cancel, classes.send)}>
              Send
                        </Button>
                    </div>
                </form>
            </div>
        </Paper>
    );
});
