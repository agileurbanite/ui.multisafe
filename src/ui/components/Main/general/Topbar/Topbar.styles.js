import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
  container: {
    width: 'calc(100vw - 48px)',
    height: '72px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 24px',
    borderBottom: '1px solid #00000020',
  },
  logo: {
    width: '182px',
  },
  connectWallet: {
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
  progress: {
    position: 'absolute',
    top: '70px',
    width: '100%',
  },
});

export const useStyles = makeStyles(styles, { name: 'Topbar' });
