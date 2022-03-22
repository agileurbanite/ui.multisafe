import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
  container: {
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    '&:hover': {
      backgroundColor: '#e9e9e9',
    },
  },
  icon: {
    color: theme.palette.text.secondary,
    margin: '0 16px',
  },
  text: {
    fontWeight: 500,
    fontSize: 14,
    color: theme.palette.text.primary,
  },
});

export const useStyles = makeStyles(styles, { name: 'MenuItem' });
