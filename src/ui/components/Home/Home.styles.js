import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '620px'
  }
};

export const useStyles = makeStyles(styles, { name: 'Home' });
