import { onMountMultisafe } from './onMountMultisafe';
import { onMountDashboard } from './onMountDashboard';
import { onMountList } from './onMountList';
import { onTransferTokens } from './onTransferTokens';
import { onConfirmRequest } from './onConfirmRequest';
import { onDeleteRequest } from './onDeleteRequest';

export const thunks = {
  onMountMultisafe,
  onMountDashboard,
  onMountList,
  onTransferTokens,
  onConfirmRequest,
  onDeleteRequest,
};
