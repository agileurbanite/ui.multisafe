import { useState } from 'react';
import { Button } from '@material-ui/core';
import { Footer } from '../general/Footer/Footer';
import { GetStartedModal } from './GetStartedModal/GetStartedModal';
import { useStyles } from './Welcome.styles';
import logo from '../../images/logo/logo-white@3x.png';
import laptop from '../../images/welcome-page/laptop@2x.png';

export const Welcome = () => {
  const [isOpen, setOpen] = useState(false);
  const classes = useStyles();

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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
        <Button onClick={onOpen} variant="contained" color="primary" className={classes.getStarted}>
          Get Started
        </Button>
        <GetStartedModal isOpen={isOpen} onClose={onClose} />
      </div>
      <img className={classes.laptop} src={laptop} alt="laptop with multisafe app" />
      <Footer classNames={{ container: classes.footer }} variant="dark" />
    </div>
  );
};
