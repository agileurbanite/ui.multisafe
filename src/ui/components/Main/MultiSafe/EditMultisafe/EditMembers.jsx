import { useStyles } from './EditMultisafe.styles';
import { FormMembers } from './Form/FormMembers';

export const EditMembers = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.headerWrapper}>
        <h1 className={classes.title}>Edit Existing Multi Safe</h1>
      </div>
      <FormMembers />
    </div>
  );
};
