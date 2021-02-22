import { useStyles } from './Topbar.styles';
import logo from '../../../../images/logo/logo-black@3x.png';

export const Topbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <img className={classes.logo} src={logo} alt="Logo of Multisafe" />
      <span>Account</span>
    </div>
  );
};
