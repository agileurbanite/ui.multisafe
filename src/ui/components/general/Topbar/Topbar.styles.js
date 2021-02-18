import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    height: '72px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 24px',
    borderBottom: '1px solid #00000020',
    alignSelf: 'stretch'
  }
};

export const useStyles = makeStyles(styles, { name: 'Topbar' });
