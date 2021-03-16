import { Footer } from '../general/Footer/Footer';
import { ConnectWallet } from '../general/ConnectWallet/ConnectWallet';
import { useStyles } from './Welcome.styles';
import logo from '../../images/logo/logo-white@3x.png';
import laptop from '../../images/welcome-page/laptop@2x.png';

export const Welcome = () => {
  const classes = useStyles();
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
      </div>
      <img className={classes.laptop} src={laptop} alt="laptop with multisafe app" />
      <Footer classNames={{ container: classes.footer }} variant="dark" />
    </div>
  );
};
