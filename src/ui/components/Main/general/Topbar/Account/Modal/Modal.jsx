import { Button, Paper, Divider } from '@material-ui/core';
import { Near } from '../../../../../general/icons/Near';
import { CopyToClipboard } from '../../../../MultiSafe/general/CopyToClipboard/CopyToClipboard';
import { OpenInExplorer } from '../../../../MultiSafe/general/OpenInExplorer/OpenInExplorer';
import { useStyles } from './Modal.styles';

export const Modal = ({ accountId }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container} elevation={4}>
      <div className={classes.account}>
        <Near className={classes.nearIcon} />
        <span className={classes.accountId}>{accountId}</span>
        <div className={classes.tools}>
          <CopyToClipboard accountId={accountId} />
          <OpenInExplorer accountId={accountId} />
        </div>
      </div>
      <Divider />
      <div className={classes.footer}>
        <Button variant="outlined" className={classes.disconnect}>
          Disconnect
        </Button>
      </div>
    </Paper>
  );
};
