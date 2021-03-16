import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Footer } from '../general/Footer/Footer';
import { ConnectWallet } from '../general/ConnectWallet/ConnectWallet';
import { useStyles } from './Welcome.styles';
import { routes } from '../../config/routes';
import logo from '../../images/logo/logo-white@3x.png';
import laptop from '../../images/welcome-page/laptop@2x.png';

export const Welcome = () => {
  const { push } = useHistory();
  const classes = useStyles();

  const tryDemo = () => push(routes.getStarted);

  return (
    <div className={classes.container}>
      <img className={classes.logo} src={logo} alt="Logo of Multisafe white" />
      <div className={classes.content}>
        <h1 className={classes.header}>
          Welcome to
          <br />
          Your Multi Safe
        </h1>
        <p className={classes.description}>
          Multi Safe is the most trusted platform to manage
          <br />
          digital assets
        </p>
        <ConnectWallet
          button={{
            className: classes.getStarted,
            variant: 'contained',
            color: 'primary',
            content: 'Get Started',
          }}
        />
        <Button className={classes.tryDemo} variant="outlined" color="primary" onClick={tryDemo}>
          Try Demo
        </Button>
      </div>
      <img className={classes.laptop} src={laptop} alt="laptop with multisafe app" />
      <Footer classNames={{ container: classes.footer }} variant="dark" />
    </div>
  );
};
