import { Requests } from './Transactions/Requests';
import { useStyles } from './History.styles';

export const History = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Requests />
    </div>
  );
};
