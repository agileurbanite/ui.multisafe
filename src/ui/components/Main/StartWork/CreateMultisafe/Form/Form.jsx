import { Button, Typography } from '@material-ui/core';
import { useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { has } from 'ramda';
import { useStyles } from './Form.styles';
import { MembersField } from './MembersField/MembersField';
import { MultisafeName } from './MultisafeName/MultisafeName';
import { Confirmations } from './Confirmations/Confirmations';
import { Amount } from './Amount/Amount';
import { createMultisafeSchema } from '../../../../../../utils/validation';

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
        hasError={!!errors.name}
        errorMessage={has('name', errors) ? errors.name.message : null}
      />
      <MembersField
        control={control}
        getValues={getValues}
        classNames={classes}
        name="members"
        errors={errors}
        hasError={!!errors.members}
        errorMessage={has('members', errors) ? errors.members.message : null}
      />
      <Confirmations
        control={control}
        classNames={classes}
        hasError={!!errors.num_confirmations}
        errorMessage={has('num_confirmations', errors) ? errors.num_confirmations.message : null}
      />
      <Amount
        control={control}
        classNames={classes}
        hasError={!!errors.amount}
        errorMessage={has('amount', errors) ? errors.amount.message : null}
      />
      <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
        Create Multi Safe
      </Button>
      <Typography className={classes.fee} align="center">
        Fee price 0 to create Multi Safe
      </Typography>
    </form>
  );
};
