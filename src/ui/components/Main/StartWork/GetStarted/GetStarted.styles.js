import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
};

export const useStyles = makeStyles(styles, { name: 'GetStarted' });
