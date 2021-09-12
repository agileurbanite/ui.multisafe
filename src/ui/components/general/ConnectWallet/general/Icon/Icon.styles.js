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
  icon: {
    height: 56,
    width: 56,
    fill: 'rgba(0, 0, 0, 0.87)'
  },
};

export const useStyles = makeStyles(styles, { name: 'Icon' });
