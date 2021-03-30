import { Transactions } from './Transactions/Transactions';
import { useStyles } from './Dashboard.styles';

export const Dashboard = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Transactions />
    </div>
  );
};
