import { CircularProgress } from '@material-ui/core';
import { useStyles } from './Loader.styles';

export const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <CircularProgress size={72} />
    </div>
  );
};
