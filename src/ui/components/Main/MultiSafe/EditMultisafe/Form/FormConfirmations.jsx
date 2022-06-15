// import { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { useStyles } from './Form.styles';
import { Confirmations } from '../../../FormElements/Confirmations/Confirmations';
import { EditConfirmationsPage } from '../../../../../../utils/validation/EditMembersPage';

export const FormConfirmations = () => {
  const onEditMultisafe = useStoreActions((actions) => actions.multisafe.onEditMultisafe);
  const history = useHistory();
  const classes = useStyles();

  const members = useStoreState((state) => state.multisafe.members || []);
  const numConfirmations = useStoreState((state) => state.multisafe.general.numConfirmations);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(EditConfirmationsPage),
    mode: 'all',
    defaultValues: {
      num_confirmations: numConfirmations,
      members: members.map((member) => ({
        account_id: member.accountId
      })),
    },
  });

  const onSubmit = handleSubmit((data) => onEditMultisafe({ data, history }));

  return (
    <form autoComplete="off" className={classes.form} onSubmit={onSubmit}>
      <Confirmations
        control={control}
        classNames={classes}
        hasError={!!errors?.num_confirmations}
        errorMessage={!!errors?.num_confirmations && errors?.num_confirmations?.message}
      />
      <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
        Send Request
      </Button>
    </form>
  );
};
