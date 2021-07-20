import { makeStyles } from '@material-ui/core';

const styles = {
  body: {
    minHeight: 'calc(100vh - 73px - 52px)', // Topbar height + border + footer height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
};

export const useStyles = makeStyles(styles, { name: 'ConnectWallet' });
