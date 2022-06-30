import { closeModal } from './closeModal';
import { deleteTemporaryData } from './deleteTemporaryData';
import { disableLoading } from './disableLoading';
import { enableLoading } from './enableLoading';
import { initApp } from './initApp';
import { openModal } from './openModal';
import { removeError } from './removeError';
import { setError } from './setError';
import { setModalData } from './setModalData';
import { setNearEntities } from './setNearEntities';
import { setTemporaryData } from './setTemporaryData';
import { setUserData } from './setUserData';
import { toggleBatchRequestView } from './toggleBatchRequestView';
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
    toggleMobileMenu,
    toggleBatchRequestView
};
