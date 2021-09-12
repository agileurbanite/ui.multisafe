import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: ' center',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.80)',
  },
  accountId: {
    width: '80%',
    overflowWrap: 'break-word',
  },
};

export const useStyles = makeStyles(styles, { name: 'Account' });
