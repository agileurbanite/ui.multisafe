import { useStoreActions } from 'easy-peasy';
import { IconButton, Tooltip } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

export const RefreshFungibleTokens = ({ accountId, refreshFungibleTokens, classNames }) => {
  const enableLoading = useStoreActions((actions) => actions.general.enableLoading);
  const disableLoading = useStoreActions((actions) => actions.general.disableLoading);  

  const onClick = async () => {
    enableLoading();
    await refreshFungibleTokens(accountId);
    disableLoading();
  };

  return (
    <IconButton onClick={onClick} className={classNames?.iconButton}>
      <Tooltip title="Refresh fungible tokens" placement="top">
        <RefreshIcon className={classNames?.icon} />
      </Tooltip>
    </IconButton>
  );
};