import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    gridArea: '1 / 1 / 2 / 2',
    display: 'grid',
    gridTemplateColumns: '24px auto 24px',
    gridTemplateRows: 'max-content max-content auto',
    gridTemplateAreas: `
      '. a .'
      'b b b'
      '. c .'
    `,
    backgroundColor: 'rgba(0, 0, 0, 0.87)',
  },
  topWrapper: {
    gridArea: 'a',
  },
  separator: {
    gridArea: 'b',
    width: '100%',
    height: '1px',
    border: 'none',
    backgroundColor: '#3b3b3b',
    margin: '24px 0 8px 0',
  },
};

export const useStyles = makeStyles(styles, { name: 'Sidebar' });
