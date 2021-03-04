import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '24px auto 24px',
    gridTemplateRows: '12px auto 12px auto 24px auto',
    gridTemplateAreas: `
      '. . .'
      '. a .'
      '. . .'
      '. b .'
      '. . .'
      '. c .'
    `,
  },
  tools: {
    gridArea: 'a',
    display: 'flex',
    justifyContent: 'space-around',
  },
  iconButton: {
    padding: '8px',
  },
  icon: {
    color: '#989898',
    '&:hover': {
      color: 'white',
    },
  },
  balance: {
    gridArea: 'b',
    height: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#434343',
    borderRadius: '8px',
    '&>span': {
      color: '#ffffff',
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: '0.5px',
    },
  },
};

export const useStyles = makeStyles(styles, { name: 'Actions' });
