import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    width: 'calc(100vw - 48px)',
    height: '72px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 24px',
    borderBottom: '1px solid #00000020',
  },
  logo: {
    width: '182px',
      ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
          display: 'none',
      },
  },
  progress: {
    position: 'absolute',
    top: '70px',
    width: '100%',
  },
  menu_toggle:{
    width: '24px',
    height: '24px',
    transition: 'all 0.6s',
    zIndex: '2000',
    cursor: 'pointer',
    outline: 'none',
    padding: '5px 3px',
    background: 'transparent',
    border: 'none',
    marginRight: '24px',
    ['@media (min-width:768px)']: { // eslint-disable-line no-useless-computed-key
      display: 'none',
    },
      '& span' : {
        transition: 'all 0.6s',
        display: 'block',
        height: '2px',
        width: '100%',
        background: '#333',
        marginBottom: '4px',
        outline: 'none',
      }
  },
  menu_toggle_active: {
    outline: 'none',

    '& span': {
      height: '1.5px',
        '&:nth-child(1)': {
          transform: 'rotate(135deg)',
          marginTop: '1px',
        },
        '&:nth-child(2)': {
          display: 'none',
        },
        '&:nth-child(3)': {
          transform: 'rotate(-135deg)',
          margin: '-5.5px 0 0',
        }
    }
  }
};

export const useStyles = makeStyles(styles, { name: 'Topbar' });
