import { Account } from './Account/Account';
import { useStyles } from './AccountList.styles';

export const AccountList = ({ accounts, selectedAccount, selectAccount }) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            {accounts.map((account) => (
                <Account
                    key={account}
                    account={account}
                    selectedAccount={selectedAccount}
                    selectAccount={selectAccount}
                />
            ))}
        </div>
    );
};
