import { forwardRef, useState } from 'react';
import { Button, Paper } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox } from '../../../../../../general/Checkbox/Checkbox';
import { Amount } from './Amount/Amount';
import { Recipient } from './Recipient/Recipient';
import { useStyles } from './SendFunds.styles';
import { sendFundsSchema } from '../../../../../../../../utils/validation/SendFundsModal';

export const SendFunds = forwardRef(({ onClose, tabIndex }, ref) => {
  const [token, setToken] = useState('near');
  const onTransferTokens = useStoreActions((actions) => actions.multisafe.onTransferTokens);
  const fungibleTokens = useStoreState((store) => store.multisafe.general.fungibleTokens);
  const { control, handleSubmit, setValue, errors } = useForm({
    resolver: yupResolver(sendFundsSchema),
    mode: 'all',
  });
  const classes = useStyles();

  const onSubmit = handleSubmit((data) => {
    const contractName = fungibleTokens.find(({name}) => name === token) ? 
      fungibleTokens.find(({name}) => name === token).contractName :
      undefined
    onTransferTokens({ data, onClose, contractName });
  });

  return (
    <Paper className={classes.container} ref={ref} tabIndex={tabIndex} elevation={5}>
      <div className={classes.wrapper}>
        <h2 className={classes.header}>Send Funds</h2>
        <form className={classes.form} onSubmit={onSubmit}>
          <Recipient
            control={control}
            classNames={classes}
            hasError={!!errors?.recipientId}
            errorMessage={!!errors?.recipientId && errors?.recipientId?.message}
          />
          <Amount
            control={control}
            classNames={classes}
            setValue={setValue}
            token={token}
            setToken={setToken}
            hasError={!!errors?.amount}
            errorMessage={!!errors?.amount && errors?.amount?.message}
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
