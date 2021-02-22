import { Link } from 'react-router-dom';
import { routes } from '../../../../config/routes';
import { useStyles } from './GetStarted.styles';

export const GetStarted = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h1>Get Started with MultiSafe</h1>
      <Link to={routes.createMultiSafe}>Create new multisafe</Link>
      <Link to="/multisafe/1/dashboard">Safe Name test.testnet</Link>
    </div>
  );
};
