import logo from '../../../images/logo/logo-black.svg';
import { useStyles } from './Topbar.styles';

export const Topbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <img className={classes.logo} src={logo} alt="Logo of Multisafe" />
    </div>
  );
};
