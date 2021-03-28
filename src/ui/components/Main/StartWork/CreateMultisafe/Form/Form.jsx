import { Button, Typography } from '@material-ui/core';
import { useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStyles } from './Form.styles';
import { MembersField } from './MembersField/MembersField';
import { AccountId } from './AccountId/AccountId';
import { MultisafeName } from './MultisafeName/MultisafeName';
import { Confirmations } from './Confirmations/Confirmations';
import { Amount } from './Amount/Amount';
import { createMultisafeSchema } from '../../../../../../utils/validation/CreateMultisafePage';

export const Form = () => {
  const onCreateMultisafe = useStoreActions((a) => a.startWork.onCreateMultisafe);

  const { control, handleSubmit, getValues, errors } = useForm({
    resolver: yupResolver(createMultisafeSchema),
    mode: 'all',
  });
  const classes = useStyles();

  const onSubmit = handleSubmit((data) => onCreateMultisafe({ data }));

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
      <Typography className={classes.fee} align="center">
        To create Multi Safe you need to have at least 5 NEAR
      </Typography>
    </form>
  );
};
