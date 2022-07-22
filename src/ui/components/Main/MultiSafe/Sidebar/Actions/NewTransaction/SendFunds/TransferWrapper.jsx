import { Paper, Tabs, Tab, Box } from '@material-ui/core';
import { useState } from 'react';

import { SendFunds } from './SendFunds';
import { useStyles } from './SendFunds.styles';
import { SendNFTs } from './SendNFTs';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 2 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export const TransferWrapper = ({onClose}) => {
    const [value, setValue] = useState(0);
    const handleChange = (_, newValue) => {
        setValue(newValue);
    };
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Tabs aria-label="Transfer Assets" value={value} onChange={handleChange} indicatorColor="primary" >
                <Tab label="Send Tokens" className={classes.tab}/>
                <Tab label="Transfer NFT" className={classes.tab}/>
            </Tabs>
            <TabPanel value={value} index={0} >
                <SendFunds onClose={onClose}/>
            </TabPanel>
            <TabPanel value={value} index={1} >
                <SendNFTs onClose={onClose}/>
            </TabPanel>
        </Paper>
    );
};
