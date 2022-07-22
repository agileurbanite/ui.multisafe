import { LinearProgress } from '@material-ui/core';
import {useStoreActions, useStoreState} from 'easy-peasy';
import { Link } from 'react-router-dom';

import { getRoute, routes } from '../../../../config/routes';
import logo from '../../../../images/logo/logo-black.svg';
import { Account } from './Account/Account';
import { NonConnected } from './NonConnected/NonConnected';
import { useStyles } from './Topbar.styles';

export const Topbar = () => {
    const isConnected = useStoreState((store) => store.general.user.isConnected);
    const isLoading = useStoreState((store) => store.general.isLoading);
    const accountId = useStoreState((store) => store.general.user.accountId);
    const isMobileMenuOpen = useStoreState((store) => store.general.isMobileMenuOpen);
    const multisafeId = useStoreState((store) => store.multisafe.general.multisafeId);
    const onMobileMenuClick = useStoreActions((actions) => actions.general.onMobileMenuClick);

    const logoLink = multisafeId
        ? getRoute.dashboard(multisafeId)
        : routes.getStarted;
    
    const classes = useStyles();

    const mobileMenuButtonClasses = [classes.menu_toggle];
    if (isMobileMenuOpen){
        mobileMenuButtonClasses.push(classes.menu_toggle_active);
    }

    return (
        <>
            <div className={classes.container}>
                <button type="button" className={mobileMenuButtonClasses.join(' ')} title="Click to open mobile nav" onClick={onMobileMenuClick}>
                    <span />
                    <span />
                    <span />
                </button>
                <Link to={logoLink}>
                    <img className={classes.logo} src={logo} alt="Logo of Multisafe" />
                </Link>
                {isConnected ? <Account accountId={accountId} /> : <NonConnected />}
            </div>
            {isLoading && <LinearProgress className={classes.progress} />}
        </>
    );
};
