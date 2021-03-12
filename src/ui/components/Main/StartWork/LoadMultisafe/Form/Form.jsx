import { Button, Divider, Typography } from '@material-ui/core';
import { useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { TextField } from '../../../general/TextField/TextField';
import { useStyles } from './Form.styles';

export const Form = () => {
  const onLoadMultisafe = useStoreActions((actions) => actions.startWork.onLoadMultisafe);
  const { control, handleSubmit } = useForm();
  const { push } = useHistory();
  const classes = useStyles();

  const onSubmit = handleSubmit((data) => {
    onLoadMultisafe({ data, push });
  });

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <TextField
        control={control}
        name="name"
        variant="outlined"
        placeholder="MultiSafe Name"
        className={classes.textField}
      />
      <TextField
        control={control}
        name="multisafeId"
        variant="outlined"
        placeholder="MultiSafe Account ID"
        className={classes.textField}
      />
      <Typography className={classes.terms}>
        By continuing you consent to the terms of use and privacy policy.
      </Typography>
      <Divider className={classes.divider} />
      <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
        Load Multi Safe
      </Button>
    </form>
  );
};
