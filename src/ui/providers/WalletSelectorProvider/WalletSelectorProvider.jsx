import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupLedger } from '@near-wallet-selector/ledger';
import ledgerIconUrl from '@near-wallet-selector/ledger/assets/ledger-icon.png';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import myNearWalletIconUrl from '@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import nearWalletIconUrl from '@near-wallet-selector/near-wallet/assets/near-wallet-icon.png';
import { useStoreActions } from 'easy-peasy';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { config } from '../../../near/config';

import '@near-wallet-selector/modal-ui/styles.css';

const WalletSelectorContext = React.createContext(null);

export const WalletSelectorContextProvider = ({ children }) => {
    const history = useHistory();
    const onDisconnect = useStoreActions((actions) => actions.general.onDisconnect);
    const [selector, setSelector] = useState(null);
    const [modal, setModal] = useState(null);
    const [accountId, setAccountId] = useState(null);
    const [accounts, setAccounts] = useState([]);

    const syncAccountState = (
        currentAccountId,
        newAccounts
    ) => {
        if (!newAccounts.length) {
            localStorage.removeItem('accountId');
            setAccountId(null);
            setAccounts([]);

            return;
        }

        const validAccountId =
      currentAccountId &&
      newAccounts.some((x) => x.accountId === currentAccountId);
        const newAccountId = validAccountId
            ? currentAccountId
            : newAccounts[0].accountId;

        localStorage.setItem('accountId', newAccountId);
        setAccountId(newAccountId);
        setAccounts(newAccounts);
    };

    const init = useCallback(async () => {
        const _selector = await setupWalletSelector({
            network: config.networkId,
            debug: true,
            modules: [
                setupNearWallet({
                    iconUrl: nearWalletIconUrl,
                }),
                setupMyNearWallet({
                    iconUrl: myNearWalletIconUrl
                }),
                setupLedger({
                    iconUrl: ledgerIconUrl,
                }),
            ],
        });
        const _modal = setupModal(_selector, { contractId: config.multisafeFactoryId });
        const state = _selector.store.getState();
        syncAccountState(localStorage.getItem('accountId'), state.accounts);

        window.selector = _selector;
        window.modal = _modal;

        setSelector(_selector);
        setModal(_modal);
    }, []);

    useEffect(() => {
        init().catch((err) => {
            console.error(err);
            alert('Failed to initialise wallet selector');
        });
    }, [init]);

    useEffect(() => {
        if (!selector) {
            return;
        }

        // if legacy authKey found, remove and force logout
        const oldAuthKey = localStorage.getItem('multisafe_wallet_auth_key');
        if (oldAuthKey) {
            localStorage.setItem('near_app_wallet_auth_key', oldAuthKey);
            localStorage.removeItem('multisafe_wallet_auth_key');
            onDisconnect({ history, selector });
        }


        const subscription = selector.store.observable
            .pipe(
                map((state) => state.accounts),
                distinctUntilChanged()
            )
            .subscribe((nextAccounts) => {
                syncAccountState(accountId, nextAccounts);
            });

        return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selector, accountId]);

    if (!selector || !modal) {
        return null;
    }

    const selectedWalletId = selector.store.getState()?.selectedWalletId ?? null;
    return (
        <WalletSelectorContext.Provider
            value={{
                selector,
                modal,
                accounts,
                accountId,
                setAccountId,
                selectedWalletId,
            }}
        >
            {children}
        </WalletSelectorContext.Provider>
    );
};

export function useWalletSelector() {
    const context = useContext(WalletSelectorContext);

    if (!context) {
        throw new Error(
            'useWalletSelector must be used within a WalletSelectorContextProvider'
        );
    }

    return context;
}
