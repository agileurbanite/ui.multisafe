import { onMountMultisafe } from './onMountMultisafe';
import { onMountDashboard } from './onMountDashboard';
import { onMountHistory } from './onMountHistory';
import { onMountList } from './onMountList';
import { onTransferTokens } from './onTransferTokens';
import { onConfirmRequest } from './onConfirmRequest';
import { onMakeFunctionCall } from './onMakeFunctionCall';
import { onDeleteRequest } from './onDeleteRequest';
import { onRemoveLocalMultisafe } from './onRemoveLocalMultisafe';
import { onEditMultisafe } from './onEditMultisafe';
import { onMountTokenList } from './onMountTokenList';

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
  onMountTokenList,
};
