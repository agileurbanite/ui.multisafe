import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    width: 400,
    height: 50,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
};

export const useStyles = makeStyles(styles, { name: 'Account' });
