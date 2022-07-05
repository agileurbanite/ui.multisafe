import { Button } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

import logo from '../../images/logo/logo-white.svg';
import laptop from '../../images/welcome-page/laptop@2x.png';
import { useWalletSelector } from '../../providers/WalletSelectorProvider/WalletSelectorProvider';
import { Footer } from '../general/Footer/Footer';
import { useStyles } from './Welcome.styles';

export const Welcome = () => {
    const classes = useStyles();
    const { modal, selector, accountId, selectedWalletId } = useWalletSelector();
    const openConnectWallet = () => modal.show();

    const signedIn = selector.isSignedIn();
    const onConnectSuccess = useStoreActions((actions) => actions.general.setUserData);
    const onLedgerConnectSuccess = useStoreActions((actions) => actions.general.onSelectLedgerAccount);
    const history = useHistory();
    const multisafeId = useStoreState((state) => state.multisafe.general.multisafeId);

    useEffect(() => {   
        if (signedIn && !multisafeId) {
            // This is to support existing legacy code to work as same as before integrating with wallet-selector
            if (selectedWalletId === 'ledger') {
                const ledgerData = localStorage.getItem('near-wallet-selector:ledger:accounts');
                const pk = ledgerData && JSON.parse(ledgerData)?.[0].publicKey;
                onLedgerConnectSuccess({ accountId, pk, history });
            } else {
                onConnectSuccess({
                    accountId,
                    isConnected: true,
                    walletType: selectedWalletId,
                    publicKey: null,
                });
            }

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
