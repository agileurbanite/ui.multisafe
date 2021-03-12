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
};

export const useStyles = makeStyles(styles, { name: 'NewTransaction' });
