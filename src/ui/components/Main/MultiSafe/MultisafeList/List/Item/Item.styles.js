import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
  container: {
    width: '100%',
    minHeight: 56,
    display: 'grid',
    gridTemplateColumns: '56px auto auto',
    gridTemplateRows: '50% 50%',
  },
  emoji: {
    gridArea: '1 / 1 / 3 / 2',
    justifySelf: 'center',
    alignSelf: 'center',
    fontSize: 18,
  },
  name: {
    gridArea: '1 / 2 / 2 / 3',
    fontWeight: 700,
    lineHeight: 1.5,
    alignSelf: 'end',
  },
  balance: {
    gridArea: '2 / 2 / 3 / 3',
    fontSize: 14,
    color: '#626262',
  },
  divider: {
    gridArea: '2 / 2 / 3 / 4',
    alignSelf: 'end',
    backgroundColor: theme.colors.dividerOnWhite,
  },
});

export const useStyles = makeStyles(styles, { name: 'Item' });
