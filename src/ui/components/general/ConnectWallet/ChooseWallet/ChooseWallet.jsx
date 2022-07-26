import { Button } from '@material-ui/core';
import { Icon } from '@ui/components/general/ConnectWallet/general/Icon/Icon.jsx';
import { useStoreActions } from 'easy-peasy';
import { useHistory } from 'react-router-dom';

import { Ledger } from '../../icons/Ledger';
import { Near } from '../../icons/Near';
import { useStyles } from './ChooseWallet.styles';

export const ChooseWallet = ({ onCloseModal, setStep }) => {
    const onConnectNearWallet = useStoreActions((a) => a.general.onConnectNearWallet);
    const history = useHistory();
    const classes = useStyles();

    const connectNearWallet = () => onConnectNearWallet(history);
    const openConnectLedger = () => setStep(2);

    return (
        <>
            <h2 className={classes.header}>Connect Wallet</h2>
            <p className={classes.description}>
        Connect your wallet to use all the features of Multi Safe
            </p>
            <div className={classes.icons}>
                <Icon onClick={connectNearWallet} title="Near Wallet" icon={Near} />
                <Icon onClick={openConnectLedger} title="Ledger" icon={Ledger} />
            </div>
            <div className={classes.footer}>
                <Button className={classes.cancel} onClick={onCloseModal}>
          Cancel
                </Button>
            </div>
        </>
    );
};
