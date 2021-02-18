import { Link } from 'react-router-dom';
import { routes } from '../../../config/routes';
import { useStyles } from './GetStarted.styles';

export const GetStarted = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h1>GetStarted with MultiSafe</h1>
      <Link to={routes.createMultisafe}>Create new multisafe</Link>
    </div>
  );
};
