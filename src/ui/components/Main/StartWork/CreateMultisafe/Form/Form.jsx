import { Button, Typography } from '@material-ui/core';
import { useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { useStyles } from './Form.styles';
import { MembersField } from './MembersField/MembersField';
import { MultisafeName } from './MultisafeName/MultisafeName';
import { Confirmations } from './Confirmations/Confirmations';
import { Amount } from './Amount/Amount';

export const Form = () => {
  const onCreateMultisafe = useStoreActions((a) => a.startWork.onCreateMultisafe);

  const { control, handleSubmit, getValues } = useForm();
  const classes = useStyles();

  const onSubmit = handleSubmit((data) => onCreateMultisafe({ data }));

  return (
    <form autoComplete="off" className={classes.form} onSubmit={onSubmit}>
      <MultisafeName control={control} classNames={classes} />
      <MembersField control={control} getValues={getValues} classNames={classes} name="members" />
      <Confirmations control={control} classNames={classes}  />
      <Amount control={control} classNames={classes} />
      <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
        Create Multi Safe
      </Button>
      <Typography className={classes.fee} align="center">
        Fee price 0 to create Multi Safe
      </Typography>
    </form>
  );
};
