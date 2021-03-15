import { makeStyles } from '@material-ui/core';

const styles = {
  button: {
    borderRadius: 8,
    textTransform: 'none',
    padding: '3px 6px 3px 6px',
    backgroundColor: ({ isOpen }) => (isOpen ? '#ebebeb' : '#ffffff'),
    '&:hover': {
      backgroundColor: '#ebebeb',
    },
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    letterSpacing: 0.25,
    color: 'rgba(0, 0, 0, 0.7)',
  },
  accountId: {
    margin: '0 4px 0 10px',
  },
  nearIcon: {
    height: 20,
    width: 20,
  },
};

export const useStyles = makeStyles(styles, { name: 'Account' });
