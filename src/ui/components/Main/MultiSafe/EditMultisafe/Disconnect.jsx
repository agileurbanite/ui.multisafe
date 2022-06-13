import { useStyles } from './EditMultisafe.styles';
import { FormConfirmations } from './Form/FormConfirmations';

export const Disconnect = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.headerWrapper}>
        <h1 className={classes.title}>Edit Existing Multi Safe</h1>
      </div>
      <FormConfirmations />
    </div>
  );
};
