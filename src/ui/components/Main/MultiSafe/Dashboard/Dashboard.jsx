import { PendingRequests } from './Transactions/PendingRequests';
import { useStyles } from './Dashboard.styles';

export const Dashboard = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <PendingRequests />
    </div>
  );
};
