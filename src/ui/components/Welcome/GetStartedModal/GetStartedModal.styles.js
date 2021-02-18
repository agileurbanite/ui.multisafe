import { makeStyles } from '@material-ui/core';

const styles = {
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: 500,
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 'none'
  }
};

export const useStyles = makeStyles(styles, { name: 'GetStartedModal' });
