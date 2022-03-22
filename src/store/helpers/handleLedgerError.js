export const handleLedgerError = (error, setModalError) => {
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
