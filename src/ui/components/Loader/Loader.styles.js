import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
  },
};

export const useStyles = makeStyles(styles, { name: 'Loader' });
