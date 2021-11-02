import { cloneElement, useEffect, useState } from 'react';
import { Loader } from './Loader/Loader';

export const Initializer = ({ store, history, children }) => {
  const [isInit, setInit] = useState(false);
  const actions = store.getActions();

  // We have to wait until Easy-Peasy will put the data from the local storage
  // (private keys, user accountId etc) into the state
  useEffect(() => {
    (async () => {
      await store.persist.resolveRehydration();
      await actions.general.onInitApp({ history, setInit });
    })();
  }, []);

  return isInit ? cloneElement(children, { history }) : <Loader />;
};
