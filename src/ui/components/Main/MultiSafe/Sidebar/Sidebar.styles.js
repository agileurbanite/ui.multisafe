import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    gridArea: '1 / 1 / 2 / 2',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.87)',
  },
  divider: {
    // width: '100%',
    // height: '1px',
    // border: 'none',
    backgroundColor: '#434343',
    margin: '24px 0 8px 0',
  },
};

export const useStyles = makeStyles(styles, { name: 'Sidebar' });
