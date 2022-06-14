import { useStyles } from './EditMultisafe.styles';
import { FormDisconnect } from './Form/FormDisconnect';

export const Disconnect = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.headerWrapper}>
        <h1 className={classes.title}>Disconnect Account</h1>
      </div>
      <FormDisconnect />
    </div>
  );
};
