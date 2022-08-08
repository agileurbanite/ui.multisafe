import { Button } from '@material-ui/core';
import { useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

import logo from '../../images/logo/logo-white.svg';
import laptop from '../../images/welcome-page/laptop@2x.png';
import { useWalletSelector } from '../../providers/WalletSelectorProvider/WalletSelectorProvider';
import { Footer } from '../general/Footer/Footer';
import { useStyles } from './Welcome.styles';

export const Welcome = () => {
    const classes = useStyles();
    const { modal, selector } = useWalletSelector();
    const openConnectWallet = () => modal.show();

    const signedIn = selector.isSignedIn();
    const history = useHistory();
    const multisafeId = useStoreState((state) => state.multisafe.general.multisafeId);

    useEffect(() => {   
        if (signedIn && !multisafeId) {
            history.push('/get-started');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signedIn]);

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
        </>
    );
};
