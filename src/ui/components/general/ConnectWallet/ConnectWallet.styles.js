import { makeStyles } from '@material-ui/core';

const styles = {
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 380,
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
  },
  header: {
    fontSize: 20,
    margin: '24px 24px 0 24px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  description: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    margin: '12px 24px 0 24px',
  },
  icons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 24,
  },
  footer: {
    height: 50,
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 24,
  },
  cancel: {
    color: 'rgba(0, 0, 0, 0.6)',
    letterSpacing: 1.25,
    marginRight: 24,
    fontWeight: 700,
  },
};

export const useStyles = makeStyles(styles, { name: 'ConnectWallet' });
