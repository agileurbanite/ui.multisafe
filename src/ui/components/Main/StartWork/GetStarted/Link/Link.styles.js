import { makeStyles } from '@material-ui/core';

const styles = {
  multisafeAction: {
    height: 56,
    padding: '16px 0 0 16px',
    borderRadius: 1,
    display: 'flex',
    alignItems: 'center',
  },

  routeLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 0,
  },

  routeName: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 1.5,
    color: '#00c08b',
    height: 24,
  },

  routeIcon: {
    '& > span': {
      padding: '0 10px',
    },
  },
};

export const useStyles = makeStyles(styles, { name: 'Link' });
