import { makeStyles } from '@material-ui/core';

const styles = {
  header: {
    margin: '30px 12px',
    fontSize: 24,
    fontWeight: 900,
  },
};

export const useStyles = makeStyles(styles, { name: 'Transactions' });
