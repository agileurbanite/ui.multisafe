import { Paper, Tabs, Tab } from '@material-ui/core';
import { useState } from 'react';

import { SendFunds } from './SendFunds';
import { useStyles } from './SendFunds.styles';
import { SendNFTs } from './SendNFTs';

export const TransferWrapper = ({onClose}) => {
    const [isSendFundsActive, setSendFundsActive] = useState(true);
    const classes = useStyles({ isSendFundsActive });
    return (
        <Paper className={classes.paper}>
            <Tabs aria-label="Transfer Assets" className={classes.tabs} >
                <Tab label="Send Tokens" onClick={() => setSendFundsActive(true)} className={classes.tab}/>
                <Tab label="Transfer NFT" onClick={() => setSendFundsActive(false)} className={classes.tab}/>
            </Tabs>
            {isSendFundsActive ? 
                <SendFunds onClose={onClose}/> :
                <SendNFTs onClose={onClose}/>
            }
        </Paper>
    );
};
