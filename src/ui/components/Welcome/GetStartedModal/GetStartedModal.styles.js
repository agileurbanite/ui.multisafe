import { makeStyles } from '@material-ui/core';

const styles = {
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: 300,
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    outline: 'none'
  },
  iconWrapper: {
    width: '96px',
    height: '96px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid rgba(0, 0, 0, 0.14)',
    borderRadius: '8px'
  }
};

export const useStyles = makeStyles(styles, { name: 'GetStartedModal' });
