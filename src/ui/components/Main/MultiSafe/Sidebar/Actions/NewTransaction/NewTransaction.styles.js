import { makeStyles } from '@material-ui/core';

const styles = {
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    gridArea: 'c',
    height: 36,
  },
  container: {
    width: 300,
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    outline: 'none',
  },
};

export const useStyles = makeStyles(styles, { name: 'NewTransaction' });
