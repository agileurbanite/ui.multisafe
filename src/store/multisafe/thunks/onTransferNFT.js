import { thunk } from 'easy-peasy';

import NonFungibleTokens from '../../../services/NonFungibleTokens';
import { signTransactionByLedger } from '../helpers/signTransactionByLedger';

const signTxByLedger = async ({
    nonFungibleTokensService,
    contract,
    withApprove,
    recipientId,
    multisafeId,
    state,
    actions,
    tokenId,
    contractName,
    signAndSendTransaction,
}) => {
    await signTransactionByLedger({
        actionName: 'Transfer NFT',
        state,
        actions,
        contractMethod: 
        async () => await nonFungibleTokensService.addTransferRequest({
            multisafeContract: contract, 
            withApprove,
            receiverId: recipientId,
            tokenId, 
            contractName,
            signAndSendTransaction,
            multisafeId,
        }),
        callback: async () => {
            await actions.multisafe.onMountDashboard(multisafeId);
        },
    });
};

export const onTransferNFT = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
    const { onClose, tokenId, contractName, selector, selectedWalletId } = payload;
    const { recipientId, withApprove } = payload.data;

    const state = getStoreState(); 
    const near = state.general.entities.near;
    const contract = state.multisafe.entities.contract;
    const multisafeId = state.multisafe.general.multisafeId;
    const actions = getStoreActions();
    const wallet = await selector.wallet();
    const signAndSendTransaction = wallet.signAndSendTransaction;

    const nonFungibleTokensService = new NonFungibleTokens(near.connection);

    // TODO: nonFungibleTokensService.addTransferRequest need to be tested
    switch (selectedWalletId) {
        case 'near-wallet':
        case 'my-near-wallet':
            await nonFungibleTokensService.addTransferRequest({
                multisafeContract: contract, 
                withApprove,
                receiverId: recipientId,
                tokenId, 
                contractName,
                signAndSendTransaction,
                multisafeId,
            });
            break;
        case 'ledger':
            await signTxByLedger({ nonFungibleTokensService, contract, withApprove, recipientId, multisafeId, state, actions, tokenId, contractName, signAndSendTransaction });
            break;
        default:
            throw Error(`Unsupported wallet selected: '${selectedWalletId}'`);
    }

    onClose();
});
