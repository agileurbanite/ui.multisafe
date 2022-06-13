import { Button } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { useStyles } from './Form.styles';
import { EditMembersPage } from '../../../../../../utils/validation/EditMembersPage';
import { MembersField } from '../../../FormElements/MembersField/MembersField';

export const FormMembers = () => {
  const editVersion = true;
  const onEditMultisafe = useStoreActions((actions) => actions.startWork.onEditMultisafe);
  const history = useHistory();
  const classes = useStyles();
  const members = useStoreState((state) => state.multisafe.members || []);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(EditMembersPage),
    mode: 'all',
    defaultValues: {
      members: members.map((member) => ({
        account_id: member.accountId
      })),
    },
  });

  const onSubmit = handleSubmit((data) => onEditMultisafe({ data, history }));

  return (
    <form autoComplete="off" className={classes.form} onSubmit={onSubmit}>
      <MembersField
        editVersion={editVersion}
        control={control}
        getValues={getValues}
        classNames={classes}
        name="members"
        errors={errors}
      />
      <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
        Send Request
      </Button>
    </form>
  );
};
