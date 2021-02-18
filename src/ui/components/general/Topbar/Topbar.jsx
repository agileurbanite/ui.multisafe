import { Link } from 'react-router-dom';
import { useStyles } from './Topbar.styles';
import { routes } from '../../../config/routes';
import logo from '../../../images/logo/logo-black.svg';

export const Topbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Link to={routes.getStarted}>
        <img src={logo} alt="Logo of Multisafe" />
      </Link>
      <span>Account</span>
    </div>
  );
};
