import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    maxHeight: 168,
    overflowY: 'auto',
    marginTop: 24,
  },
};

export const useStyles = makeStyles(styles, { name: 'AccountList' });
