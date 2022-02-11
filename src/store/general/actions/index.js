import { initApp } from './initApp';
import { enableLoading } from './enableLoading';
import { disableLoading } from './disableLoading';
import { setError } from './setError';
import { removeError } from './removeError';
import { setTemporaryData } from './setTemporaryData';
import { deleteTemporaryData } from './deleteTemporaryData';
import { setUserData } from './setUserData';
import { openModal } from './openModal';
import { setModalData } from './setModalData';
import { closeModal } from './closeModal';
import { setNearEntities } from './setNearEntities';
import { toggleMobileMenu } from './toggleMobileMenu';

export const actions = {
  initApp,
  enableLoading,
  disableLoading,
  setError,
  removeError,
  setTemporaryData,
  deleteTemporaryData,
  setUserData,
  openModal,
  setModalData,
  closeModal,
  setNearEntities,
  toggleMobileMenu
};
