import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    height: '100%',
    width: 'calc(100% - 48px)',
  },
};

export const useStyles = makeStyles(styles, { name: 'Dashboard' });
