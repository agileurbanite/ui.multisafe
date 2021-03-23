import { IconButton, Tooltip } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';
import { near } from '../../../../../../near/config';

export const OpenInExplorer = ({ accountId, classNames, accountType = 'account' }) => (
  <a href={near.getCheckAccountInExplorerUrl(accountId)} target="_blank" rel="noreferrer">
    <IconButton className={classNames?.iconButton}>
      <Tooltip title={`View ${accountType} in explorer`} placement="top">
        <OpenInNew className={classNames?.icon} />
      </Tooltip>
    </IconButton>
  </a>
);
