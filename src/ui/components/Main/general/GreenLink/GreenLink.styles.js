import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    color: theme.palette.primary.main,
  },
  iconContainer: {
    height: 56,
    width: 56,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {},
  textContainer: {
    width: 'calc(100% - 56px)',
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.colors.dividerOnWhite}`,
  },
  text: {
    fontWeight: 700,
    lineHeight: 1.5,
  },
});

export const useStyles = makeStyles(styles, { name: 'GreenLink' });
