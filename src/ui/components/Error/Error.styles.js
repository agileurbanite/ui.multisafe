import { makeStyles } from '@material-ui/core';

const styles = {
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 350,
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
  },
};

export const useStyles = makeStyles(styles, { name: 'Error' });
