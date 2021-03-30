import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    gridArea: 'a',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.87)',
  },
  divider: {
    backgroundColor: '#434343',
    marginTop: 24,
  },
};

export const useStyles = makeStyles(styles, { name: 'Sidebar' });
