import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  pageHeader: {
    display: 'flex',
    marginTop: '36px',
  },
  emoji: {
    width: 69,
    height: 80,
    marginRight: '24px',
  },

  titleBlock: {
    display: 'flex',
    flexDirection: 'column',
  },

  searchForm: {
    marginTop: 36,
  },

  multisafeActions: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '16px',
  },

  multisafeAction: {
    height: 56,
    padding: '16px 0 0 16px',
    borderRadius: 1,
    display: 'flex',
    alignItems: 'center',
  },

  routeName: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 1.5,
    color: '#00c08b',
    height: 24,
  },

  routeIcon: {
    // temp
    '& > span': {
      padding: '0 10px',
    },
  },

  routeLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 0,
  },
};

export const useStyles = makeStyles(styles, { name: 'GetStarted' });
