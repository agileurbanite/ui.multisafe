import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    height: 'calc(100vh - 73px)',
    display: 'grid',
    gridTemplateColumns: '256px auto',
    gridTemplateRows: 'auto',
    gridTemplateAreas: `
      'a b'
    `,
  },
  content: {
    gridArea: 'b',
  },
};

export const useStyles = makeStyles(styles, { name: 'MultiSafe' });
