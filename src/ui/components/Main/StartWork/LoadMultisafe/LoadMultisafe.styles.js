import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    width: '620px',
  },
  headerWrapper: {
    display: 'grid',
    gridTemplateColumns: '10% 80% 10%',
    gridTemplateRows: 'auto',
    gridTemplateAreas: `
      'a b .'
    `,
    alignItems: 'center',
    marginTop: 36,
  },
  goBack: {
    gridArea: 'a',
    justifySelf: 'start',
    padding: 0,
  },
  icon: {
    height: 28,
    width: 28,
    padding: 0,
    color: 'rgba(0, 0, 0, 87)',

  },
  title: {
    gridArea: 'b',
    justifySelf: 'center',
    fontSize: 34,
    fontWeight: 900,
    margin: 0,
  },
  subheader: {
    marginTop: 25,
  },
  description: {
    marginTop: 25,
  },
};

export const useStyles = makeStyles(styles, { name: 'LoadMultisafe' });
