import { makeStyles } from '@material-ui/core';

const styles = {
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    padding: '10px',
    marginTop: '34px',
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
