import { cloneElement, useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { setInitRoute } from './setInitRoute';

export const Initializer = ({ history, store, children }) => {
  const [isInit, setInit] = useState(false);

  useEffect(() => {
    (async () => {
      await store.persist.resolveRehydration();
      setInitRoute(history, store);
      const actions = store.getActions();
      await actions.general.onInitApp({ history });
      setInit(true);
    })();
  }, [store, history]);

  return isInit ? cloneElement(children, { history }) : <Loader />;
};
