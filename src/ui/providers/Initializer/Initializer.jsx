import { cloneElement, useEffect, useState } from 'react';

import { useWalletSelector } from '../WalletSelectorProvider/WalletSelectorProvider';
import { Loader } from './Loader/Loader';

export const Initializer = ({ store, history, children }) => {
    const [isInit, setInit] = useState(false);
    const actions = store.getActions();
    const { selector, accountId, selectedWalletId } = useWalletSelector();
    // We have to wait until Easy-Peasy will put the data from the local storage
    // (private keys, user accountId etc) into the state
    const isSignedIn = selector?.isSignedIn() || false;
    useEffect(() => {
        (async () => {
            await store.persist.resolveRehydration();
            await actions.general.onInitApp({ history, setInit, selector, accountId, selectedWalletId });
        })();
    }, [actions.general, history, store.persist, accountId, selectedWalletId, selector, isSignedIn]);

    return isInit ? cloneElement(children, { history }) : <Loader />;
};
