import { Link } from 'react-router-dom';
import { routes } from '../../../../config/routes';
import { useStyles } from './Dashboard.styles';

export const Dashboard = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h1>MultiSafe Dashboard</h1>
      <Link to={routes.getStarted}>Back to get started</Link>
    </div>
  );
};
