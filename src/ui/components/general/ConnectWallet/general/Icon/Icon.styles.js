import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 10px',
  },
  iconWrapper: {
    width: '96px',
    height: '96px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid rgba(0, 0, 0, 0.14)',
    borderRadius: '8px',
  },
  // We have a bug with JSS and Material UI on the prod - this class embedding into 'head' before
  // MaterialUi-root general icon class
  icon: {
    height: '56px!important',
    width: '56px!important',
    fill: 'rgba(0, 0, 0, 0.87)!important'
  },
};

export const useStyles = makeStyles(styles, { order: 1, name: 'Icon' });
