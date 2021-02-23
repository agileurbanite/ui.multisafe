import { makeStyles } from '@material-ui/core';

const styles = {
  main: {
    lineHeight: 'normal',
    margin: 0
  },
  is1: {
    lineHeight: 'normal',
    fontWeight: 900,
    fontSize: '34px'
  },
  is2: {},
  is3: {}
};

export const useStyles = makeStyles(styles, { name: 'Headline' });
