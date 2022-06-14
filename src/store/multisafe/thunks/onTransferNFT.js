import { thunk } from 'easy-peasy';
import { signTransactionByLedger } from '../helpers/signTransactionByLedger';
import NonFungibleTokens from '../../../services/NonFungibleTokens';

const signTxByLedger = async (
  nonFungibleTokensService,
  contract,
  withApprove,
  recipientId,
  multisafeId,
  state,
  actions,
  tokenId,
  contractName
) => {
  // to do: check that sign tx by ledger works
  await signTransactionByLedger({
    actionName: 'Transfer NFT',
    state,
    actions,
    contractMethod: 
        () => nonFungibleTokensService.addTransferRequest({
            multisafeContract: contract, 
            withApprove,
            receiverId: recipientId,
            tokenId, 
            contractName 
        }),
    callback: async () => {
      await actions.multisafe.onMountDashboard(multisafeId);
    },
  });
};

export const onTransferNFT = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  const { onClose, tokenId, contractName } = payload;
  const { recipientId, withApprove } = payload.data;

  const state = getStoreState(); 
  const isNearWallet = state.general.selectors.isNearWallet;
  const near = state.general.entities.near;
  const contract = state.multisafe.entities.contract;
  const multisafeId = state.multisafe.general.multisafeId;

  const actions = getStoreActions();
  const mountNonFungibleTokenList = actions.multisafe.mountNonFungibleTokenList;

  const nonFungibleTokensService = new NonFungibleTokens(near.connection);

  isNearWallet
    ? await nonFungibleTokensService.addTransferRequest({
        multisafeContract: contract, 
        withApprove,
        receiverId: recipientId,
        tokenId, 
        contractName 
    })
    : await signTxByLedger(nonFungibleTokensService, contract, withApprove, recipientId, multisafeId, state, actions, tokenId, contractName);

  const nonFungibleTokens = state.multisafe.general.nonFungibleTokens;
  const updatedTokens = await Promise.all(await nonFungibleTokens.map(async (nftContract) => {
    const tokenMetadata = await nonFungibleTokensService.getMetadata({ contractName: nftContract });
    const tokens = await nonFungibleTokensService.getTokens(
      { contractName: nftContract, 
        accountId: multisafeId,
        base_uri: tokenMetadata.base_uri });
    const tokenBalance = await nonFungibleTokensService.getBalanceOf({ contractName: nftContract, accountId: multisafeId }); 
    return { ...tokenMetadata, tokenBalance, contractName: nftContract, tokens };
  }));

  mountNonFungibleTokenList({
    nonFungibleTokens: updatedTokens
  });

  onClose();
});
