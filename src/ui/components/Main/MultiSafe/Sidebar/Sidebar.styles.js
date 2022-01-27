import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    gridArea: 'a',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.87)',
      ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
        position: 'fixed',
        left: '-150%',
        top: '73px',
        bottom: '0',
        transition: 'all .35s ease',
        overflow: 'auto'
      },
  },
  active: {
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      left: '0',
    },
  },
  divider: {
    backgroundColor: '#434343',
    marginTop: 24,
  },
};

export const useStyles = makeStyles(styles, { name: 'Sidebar' });
