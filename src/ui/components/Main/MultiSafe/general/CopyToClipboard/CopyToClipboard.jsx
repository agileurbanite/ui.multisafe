import { IconButton, Tooltip } from '@material-ui/core';
import { FileCopyOutlined } from '@material-ui/icons';

export const CopyToClipboard = ({ accountId, classNames }) => {
  const onClick = () => {
    navigator.clipboard.writeText(accountId);
  };

  return (
    <IconButton onClick={onClick} className={classNames?.iconButton}>
      <Tooltip title="Copy account id to clipboard" placement="top">
        <FileCopyOutlined className={classNames?.icon} />
      </Tooltip>
    </IconButton>
  );
};
