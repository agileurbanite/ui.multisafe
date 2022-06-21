import { handleLedgerError } from '../../helpers/handleLedgerError';

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

    // TODO Check if we can set hooks only once during the LedgerSigner creation
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
