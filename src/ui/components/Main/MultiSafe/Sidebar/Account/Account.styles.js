import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
  container: {
    minHeight: '64px',
    display: 'grid',
    gridTemplateColumns: '24px 15% auto 12%',
    gridTemplateRows: '50% 50%',
    gridTemplateAreas: `
      '. a b d'
      '. a c d'
    `,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.colors.dashboardHoverBgGrey,
    },
  },
  emoji: {
    gridArea: 'a',
    fontSize: 20,
    alignSelf: 'center',
  },
  name: {
    gridArea: 'b',
    alignSelf: 'end',
    color: '#ffffff',
    fontWeight: 700,
    letterSpacing: '0.25px',
    lineHeight: 1.5,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  multisafeId: {
    gridArea: 'c',
    alignSelf: 'start',
    color: theme.colors.dashboardGrey,
    lineHeight: 1.5,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  icon: {
    gridArea: 'd',
    alignSelf: 'center',
    color: theme.colors.dashboardGrey,
  },
});

export const useStyles = makeStyles(styles, { name: 'Account' });
