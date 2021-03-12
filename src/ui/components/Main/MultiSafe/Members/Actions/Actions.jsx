import { useStoreState } from 'easy-peasy';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { Divider, IconButton } from '@material-ui/core';
import { CopyToClipboard } from '../../general/CopyToClipboard/CopyToClipboard';
import { OpenInExplorer } from '../../general/OpenInExplorer/OpenInExplorer';
import { useStyles } from './Actions.styles';

export const Actions = ({ accountId, isHovered }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.tools}>
        <CopyToClipboard classNames={{ icon: classes.icon }} accountId={accountId} />
        <OpenInExplorer classNames={{ icon: classes.icon }} accountId={accountId} />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton className={classes.removeButton}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};
