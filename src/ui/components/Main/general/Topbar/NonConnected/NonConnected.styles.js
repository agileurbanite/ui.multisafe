import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
  clearDataButton: {
    marginRight: 16,
    borderRadius: 8,
    padding: '3px 16px 3px 8px',
    borderColor: theme.colors.dividerOnWhite,
    textTransform: 'none',
  },
  connectWalletButton: {
    borderRadius: 8,
    borderColor: theme.colors.dividerOnWhite,
    textTransform: 'none',
    padding: '3px 16px 3px 8px',
  },
  buttonContent: {
    display: 'flex',
    '&>span': {
      marginLeft: 5,
    },
  },
});

export const useStyles = makeStyles(styles, { name: 'NonConnected' });
