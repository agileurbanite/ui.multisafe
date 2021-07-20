import { Switch, Route } from 'react-router';
import { routes } from '../../config/routes';
import { Topbar } from './Topbar/Topbar';
import { Footer } from '../general/Footer/Footer';
import { WalletOptions } from './WalletOptions/WalletOptions';
import { ConnectLedger } from './ConnectLedger/ConnectLedger';
import { SelectAccount } from './SelectAccount/SelectAccount';
import { useStyles } from './ConnectWallet.styles';

export const ConnectWallet = () => {
  const classes = useStyles();

  return (
    <>
      <Topbar />
      <div className={classes.body}>
        <Switch>
          <Route exact path={routes.connectWallet} component={WalletOptions} />
          <Route exact path={routes.connectLedger} component={ConnectLedger} />
          <Route exact path={routes.selectLedgerAccount} component={SelectAccount} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};
