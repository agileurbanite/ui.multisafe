import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
  container: {
    gridArea: 'b',
    width: 360,
    backgroundColor: '#fafafa',
    zIndex: 102,
    position: 'relative'
  },
  topbar: {
    height: 64,
    display: 'grid',
    gridTemplateColumns: '5px 49px auto',
    gridTemplateRows: 'auto',
    gridTemplateAreas: `
      'c a b'
    `,
  },
  arrow: {
    gridArea: 'c',
    height: 10,
    width: 10,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    justifySelf: 'end',
    transform: 'rotate(45deg)',
  },

  topbarIcon: {
    gridArea: 'a',
  },
  header: {
    gridArea: 'b',
    fontSize: 20,
    alignSelf: 'center',
    margin: 0,
    fontWeight: 900,
    color: 'rgba(7,7,7,0.87)',
    letterSpacing: '0.25px',
  },
  divider: {
    backgroundColor: theme.colors.dividerOnWhite,
  },
  readOnlyHeader: {
    margin: '26px 0 20px 16px',
    color: 'rgba(0, 0, 0, 0.54)',
  },
});

export const useStyles = makeStyles(styles, { name: 'MultisafeList' });
