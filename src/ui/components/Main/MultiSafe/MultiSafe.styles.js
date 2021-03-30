import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    width: '100vw',
    minHeight: 'calc(100vh - 73px)',
    display: 'grid',
    gridTemplateColumns: '256px auto',
    gridTemplateRows: 'auto',
    gridTemplateAreas: `
      'a b'
    `,
  },
  content: {
    gridArea: 'b',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export const useStyles = makeStyles(styles, { name: 'MultiSafe' });
