import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    height: 'calc(100vh - 73px)',
    display: 'grid',
    gridTemplateColumns: '256px auto',
    gridTemplateRows: 'auto',
  },
  content: {
    gridArea: '1 / 2 / 2 / 3',
  },
};

export const useStyles = makeStyles(styles, { name: 'MultiSafe' });
