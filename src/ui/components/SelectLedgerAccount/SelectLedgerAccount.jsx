import { Backdrop, Button, Modal, Paper } from '@material-ui/core';
import { config } from '@near/config';
import cn from 'classnames';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { AccountList } from './AccountList/AccountList';
import { useStyles } from './SelectLedgerAccount.styles';

export const SelectLedgerAccount = () => {
    const [selectedAccount, selectAccount] = useState(null);
    const modal = useStoreState((state) => state.general.modals.selectLedgerAccount);
    const onSelectLedgerAccount = useStoreActions((actions) => actions.general.onSelectLedgerAccount);
    const closeModal = useStoreActions((actions) => actions.general.closeModal);
    const history = useHistory();
    const classes = useStyles();

    if (!modal) return null;

    const { accounts, pk } = modal;
    const isAccounts = accounts.length > 0;

    const onCloseModal = () => closeModal({ modal: 'selectLedgerAccount' });
    const onSelectAccount = () => onSelectLedgerAccount({ accountId: selectedAccount, pk, history });

    return (
        <Modal
            className={classes.modal}
            open
            onClose={onCloseModal}
            BackdropComponent={Backdrop}
            BackdropProps={{ classes: { root: classes.backdropRoot } }}
        >
            <Paper className={classes.container}>
                <div className={classes.wrapper}>
                    <h2 className={classes.header}>Select account</h2>

                    {isAccounts ? (
                        <>
                            <p className={classes.description}>
                Select NEAR account which you want to use with Multi Safe
                            </p>
                            <AccountList
                                accounts={accounts}
                                selectedAccount={selectedAccount}
                                selectAccount={selectAccount}
                            />
                        </>
                    ) : (
                        <p className={classes.noAccounts}>
              Can&#39;t found any account associated with this Ledger. Please create a new NEAR
              account on{' '}
                            <a href={`${config.walletUrl}/create`} target="_blank" rel="noreferrer">
                NEAR Wallet
                            </a>{' '}
              or connect an another Ledger.
                        </p>
                    )}

                    <div className={classes.footer}>
                        <Button className={classes.cancel} onClick={onCloseModal}>
                            {isAccounts ? 'Cancel' : 'Close'}
                        </Button>
                        {isAccounts && (
                            <Button
                                className={cn(classes.cancel, classes.select)}
                                onClick={onSelectAccount}
                                disabled={!selectedAccount}
                            >
                Select
                            </Button>
                        )}
                    </div>
                </div>
            </Paper>
        </Modal>
    );
};
