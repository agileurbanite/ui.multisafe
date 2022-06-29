import { onConfirmRequest } from './onConfirmRequest';
import { onDeleteRequest } from './onDeleteRequest';
import { onEditMultisafe, isBatchRequest } from './onEditMultisafe';
import { onMakeFunctionCall } from './onMakeFunctionCall';
import { onMountDashboard } from './onMountDashboard';
import { onMountHistory } from './onMountHistory';
import { onMountList } from './onMountList';
import { onMountMultisafe } from './onMountMultisafe';
import { onMountNonFungibleTokenList } from './onMountNonFungibleTokenList';
import { onMountTokenList } from './onMountTokenList';
import { onRemoveLocalMultisafe } from './onRemoveLocalMultisafe';
import { onTransferNFT } from './onTransferNFT';
import { onTransferTokens } from './onTransferTokens';

export const thunks = {
    onMountMultisafe,
    onMountDashboard,
    onMountHistory,
    onMountList,
    onTransferTokens,
    onConfirmRequest,
    onMakeFunctionCall,
    onDeleteRequest,
    onRemoveLocalMultisafe,
    onEditMultisafe,
    isBatchRequest,
    onMountTokenList,
    onMountNonFungibleTokenList,
    onTransferNFT
};
