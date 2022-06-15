import { IconButton, Tooltip } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

export const RefreshFungibleTokens = ({ accountId, refreshFungibleTokens, classNames }) => {
  const onClick = async () => {
    await refreshFungibleTokens(accountId)
  };

  return (
    <IconButton onClick={onClick} className={classNames?.iconButton}>
      <Tooltip title="Refresh fungible tokens" placement="top">
        <RefreshIcon className={classNames?.icon} />
      </Tooltip>
    </IconButton>
  );
};
