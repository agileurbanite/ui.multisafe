import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    gridArea: 'b',
    display: ({ isListOpen }) => (isListOpen ? 'grid' : 'none'),
    gridTemplateColumns: '360px auto',
    gridTemplateRows: 'auto',
    gridTemplateAreas: `
      'a b'
    `,
    zIndex: 2,
  },
  closeArea: {
    gridArea: 'b',
  },
};

export const useStyles = makeStyles(styles, { name: 'MultisafeList' });
