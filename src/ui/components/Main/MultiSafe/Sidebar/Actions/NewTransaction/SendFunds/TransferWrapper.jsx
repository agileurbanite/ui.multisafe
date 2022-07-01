import { Paper } from '@material-ui/core';
import { useState } from 'react';

import { SendFunds } from './SendFunds';
import { useStyles } from './SendFunds.styles';
import { SendNFTs } from './SendNFTs';

export const TransferWrapper = ({onClose}) => {
    const [isSendFundsActive, setSendFundsActive] = useState(true);
    const classes = useStyles({ isSendFundsActive });
    return (
        <Paper className={classes.paper}>
            <div className={classes.directory}>
                <h2 className={classes.sendFunds} onClick={() => setSendFundsActive(true)}>Send Funds</h2>
                <h2 className={classes.sendNFTs} onClick={() => setSendFundsActive(false)}>Transfer NFTs</h2>
            </div>
            {isSendFundsActive ? 
                <SendFunds onClose={onClose}/> :
                <SendNFTs onClose={onClose}/>
            }
        </Paper>
    );
};
