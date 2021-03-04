import { IconButton, Tooltip } from '@material-ui/core';
import { FileCopyOutlined, OpenInNew } from '@material-ui/icons';
import { useStoreState } from 'easy-peasy';
import { NewTransaction } from './NewTransaction/NewTransaction';
import { formatNearBalance } from '../../../../../utils/format';
import { near } from '../../../../../config/near';
import { useStyles } from './Actions.styles';

export const Actions = () => {
  const balance = useStoreState((s) => s.multisafe.balance);
  const multisafeId = useStoreState((s) => s.multisafe.multisafeId);
  const isMember = useStoreState((s) => s.multisafe.computed.isMember);
  const classes = useStyles();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(multisafeId);
  };

  return (
    <div className={classes.container}>
      <div className={classes.tools}>
        <IconButton onClick={copyToClipboard} className={classes.iconButton}>
          <Tooltip title="Copy account id to clipboard" placement="top">
            <FileCopyOutlined className={classes.icon} />
          </Tooltip>
        </IconButton>
        <a href={near.getCheckAccountInExplorerUrl(multisafeId)} target="_blank" rel="noreferrer">
          <IconButton className={classes.iconButton}>
            <Tooltip title="View contract in explorer" placement="top">
              <OpenInNew className={classes.icon} />
            </Tooltip>
          </IconButton>
        </a>
      </div>

      <div className={classes.balance}>
        <span>{formatNearBalance(balance)}</span>
      </div>

      {isMember ? <NewTransaction /> : <div className={classes.readOnly}>READ ONLY</div>}
    </div>
  );
};
