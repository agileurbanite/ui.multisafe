import { onMountMultisafe } from './onMountMultisafe';
import { onMountDashboard } from './onMountDashboard';
import { onMountHistory } from './onMountHistory';
import { onMountList } from './onMountList';
import { onTransferTokens } from './onTransferTokens';
import { onConfirmRequest } from './onConfirmRequest';
import { onDeleteRequest } from './onDeleteRequest';
import { onRemoveLocalMultisafe } from './onRemoveLocalMultisafe';
import { onEditMultisafe } from './onEditMultisafe';

export const thunks = {
  onMountMultisafe,
  onMountDashboard,
  onMountHistory,
  onMountList,
  onTransferTokens,
  onConfirmRequest,
  onDeleteRequest,
  onRemoveLocalMultisafe,
  onEditMultisafe
};
