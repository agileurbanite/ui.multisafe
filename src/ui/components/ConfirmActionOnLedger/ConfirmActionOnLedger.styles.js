import { makeStyles } from '@material-ui/core';

const styles = {
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
    borderRadius: 8,
  },
  wrapper: {
    margin: '24px 24px 16px 24px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  ledgerDeviceImage: {
    width: 300,
  }
};

export const useStyles = makeStyles(styles, { name: 'ConfirmActionOnLedger' });
