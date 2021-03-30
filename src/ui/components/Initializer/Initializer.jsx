import { cloneElement, useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { onInit } from './onInit';

export const Initializer = ({ store, history, children }) => {
  const [isInit, setInit] = useState(false);

  useEffect(() => {
    onInit(store, history, setInit);
  }, [store, history]);

  return isInit ? cloneElement(children, { history }) : <Loader />;
};
