const handleLedgerError = (error, setModalError) => {
  if (error.name === 'TransportOpenUserCancelled') {
    setModalError(error.message);
    return;
  }

  if (error.name === 'TransportStatusError' && error.statusCode === 28160) {
    setModalError('NEAR app is not running on the Ledger');
    return;
  }

  if (error.name === 'TransportStatusError' && error.statusCode === 27013) {
    setModalError('Action rejected by user');
    return;
  }

  setModalError('Unknown error during the transaction signing');
};

export const signTransactionByLedger = async ({
  actionName,
  state,
  actions,
  contractMethod,
  callback,
}) => {
  const signer = state.general.entities.near.config.signer;
  const openModal = actions.general.openModal;
  const setModalData = actions.general.setModalData;
  const closeModal = actions.general.closeModal;

  const modal = 'confirmActionOnLedger';
  const setModalError = (error) => setModalData({ modal, payload: { error } });

  signer.setHooks({
    onAfterSignTx: () => setModalData({ modal, payload: { showLoader: true } }),
  });

  try {
    openModal({ modal, payload: { actionName } });

    const result = await contractMethod();
    await callback(result);

    closeModal({ modal });
  } catch (error) {
    if (error.fromLedgerSigner) {
      handleLedgerError(error, setModalError);
      return;
    }

    if (error.kind?.ExecutionError) {
      setModalError(error.kind.ExecutionError);
      return;
    }

    setModalError(`Unexpected error: ${error.message}`);
  } finally {
    signer.resetHooks();
  }
};
