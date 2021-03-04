import { IconButton } from '@material-ui/core';
import { FileCopyOutlined, OpenInNew } from '@material-ui/icons';
import { useStoreState } from 'easy-peasy';
import { NewTransaction } from './NewTransaction/NewTransaction';
import { formatNearBalance } from '../../../../../utils/format';
import { useStyles } from './Actions.styles';

export const Actions = () => {
  const balance = useStoreState((s) => s.multisafe.balance);
  const isMember = useStoreState((s) => s.multisafe.computed.isMember);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.tools}>
        <IconButton className={classes.iconButton}>
          <FileCopyOutlined className={classes.icon} />
        </IconButton>
        <IconButton className={classes.iconButton}>
          <OpenInNew className={classes.icon} />
        </IconButton>
      </div>
      <div className={classes.balance}>
        <span>{formatNearBalance(balance)}</span>
      </div>
      {isMember ? <NewTransaction /> : <div className={classes.readOnly}>READ ONLY</div>}
    </div>
  );
};
