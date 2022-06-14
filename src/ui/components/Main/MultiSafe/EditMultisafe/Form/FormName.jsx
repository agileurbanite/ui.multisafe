import { Button } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useStyles } from './Form.styles';
import { MultisafeName } from '../../../FormElements/MultisafeName/MultisafeName';
import { getRoute } from '../../../../../config/routes';

export const FormName = () => {
  const editVersion = true;
  const changeMultisafeName = useStoreActions((actions) => actions.multisafe.changeMultisafeName);
  const history = useHistory();
  const classes = useStyles();
  const name = useStoreState((state) => state.multisafe.general.name);
  const multisafeId = useStoreState((state) => state.multisafe.general.multisafeId);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    defaultValues: {
      name
    },
  });

  const onSubmit = handleSubmit((data) => {
    changeMultisafeName({ multisafeId, data })
    history.push(getRoute.dashboard(multisafeId));
  });

  return (
    <form autoComplete="off" className={classes.form} onSubmit={onSubmit}>
      <MultisafeName
        control={control}
        classNames={classes}
        hasError={!!errors?.name}
        errorMessage={!!errors?.name && errors?.name?.message}
        editVersion={editVersion}
      />
      <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
        Save Changes
      </Button>
    </form>
  );
};
