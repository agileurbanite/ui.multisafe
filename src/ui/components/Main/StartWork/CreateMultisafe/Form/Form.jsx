import { Button } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useForm } from 'react-hook-form';

import { useHistory } from 'react-router-dom';
import { useStyles } from './Form.styles';
import { MembersField } from './MembersField/MembersField';
import { AccountId } from './AccountId/AccountId';
import { MultisafeName } from './MultisafeName/MultisafeName';
import { Confirmations } from './Confirmations/Confirmations';
import { Amount } from './Amount/Amount';
import { resolver } from './validation';

export const Form = () => {
  const near = useStoreState((state) => state.general.entities.near);
  const accountId = useStoreState((store) => store.general.user.accountId);
  const onCreateMultisafe = useStoreActions((actions) => actions.startWork.onCreateMultisafe);
  const history = useHistory();
  const classes = useStyles();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver,
    defaultValues: {
      members: [{ account_id: accountId }],
      num_confirmations: '1',
    },
    context: { near },
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
        hasError={Boolean(errors?.multisafeId)}
        errorMessage={errors?.multisafeId?.message}
      />
      <MembersField control={control} classNames={classes} errors={errors} />
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
