import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    width: '100%',
    height: '52px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  text: {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: 1.33,
    letterSpacing: '0.4px',
    color: '#ffffff99'
  }
};

export const useStyles = makeStyles(styles, { name: 'Footer' });
