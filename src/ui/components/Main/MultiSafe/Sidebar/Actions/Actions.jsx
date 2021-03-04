import { IconButton } from '@material-ui/core';
import { FileCopyOutlined, OpenInNew, Dashboard } from '@material-ui/icons';
import { NewTransaction } from './NewTransaction/NewTransaction';
import { useStyles } from './Actions.styles';

export const Actions = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.tools}>
        <IconButton className={classes.iconButton}>
          <Dashboard className={classes.icon} />
        </IconButton>
        <IconButton className={classes.iconButton}>
          <FileCopyOutlined className={classes.icon} />
        </IconButton>
        <IconButton className={classes.iconButton}>
          <OpenInNew className={classes.icon} />
        </IconButton>
      </div>
      <div className={classes.balance}>
        <span>700.74 NEAR</span>
      </div>
      <NewTransaction />
    </div>
  );
};
