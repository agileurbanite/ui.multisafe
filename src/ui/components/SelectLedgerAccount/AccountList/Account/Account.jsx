import { Checkbox } from '@material-ui/core';

import { useStyles } from './Account.styles';

export const Account = ({ account, selectedAccount, selectAccount }) => {
    const classes = useStyles();

    const onChange = () => {
        if (selectedAccount === account) return;
        selectAccount(account);
    };

    return (
        <div key={account} className={classes.container}>
            <span className={classes.accountId}>{account}</span>
            <Checkbox
                checked={selectedAccount === account}
                onChange={onChange}
                color="primary"
            />
        </div>
    );
};
