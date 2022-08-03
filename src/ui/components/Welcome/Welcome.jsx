import { Button } from '@material-ui/core';
import { useState } from 'react';

import logo from '../../images/logo/logo-white.svg';
import laptop from '../../images/welcome-page/laptop@2x.png';
import { ConnectWallet } from '../general/ConnectWallet/ConnectWallet';
import { Footer } from '../general/Footer/Footer';
import { useStyles } from './Welcome.styles';

export const Welcome = () => {
    const [isOpenConnectWallet, setOpenConnectWallet] = useState(false);
    const classes = useStyles();

    const openConnectWallet = () => setOpenConnectWallet(true);

    return (
        <>
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
                    <Button
                        onClick={openConnectWallet}
                        className={classes.getStarted}
                        variant="contained"
                        color="primary"
                    >
            Get Started
                    </Button>
                    {/*<Button*/}
                    {/*  className={classes.tryDemo}*/}
                    {/*  variant="outlined"*/}
                    {/*  color="primary"*/}
                    {/*  onClick={goToGetStarted}*/}
                    {/*>*/}
                    {/*  Try Demo*/}
                    {/*</Button>*/}
                </div>
                <img className={classes.laptop} src={laptop} alt="laptop with multisafe app" />
                <Footer classNames={{ container: classes.footer }} variant="dark" />
            </div>
            {isOpenConnectWallet && <ConnectWallet setModalOpen={setOpenConnectWallet} />}
        </>
    );
};
