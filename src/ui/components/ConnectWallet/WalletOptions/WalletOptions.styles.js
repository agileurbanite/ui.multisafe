import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    width: 380,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    textAlign: 'center',
  },
  icons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 24,
  },
};

export const useStyles = makeStyles(styles, { name: 'WalletOptions' });
