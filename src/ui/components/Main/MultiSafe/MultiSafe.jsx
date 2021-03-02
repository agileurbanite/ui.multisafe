import { Link } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar';
import { routes } from '../../../config/routes';
import { useStyles } from './MultiSafe.styles';

export const MultiSafe = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Sidebar />
      <div className={classes.content}>
        <h1>MultiSafe Dashboard</h1>
        <Link to={routes.getStarted}>Back to get started</Link>
      </div>
    </div>
  );
};
