import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    minHeight: 500,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  }
};

export const useStyles = makeStyles(styles, { name: 'ConnectLedger' });
