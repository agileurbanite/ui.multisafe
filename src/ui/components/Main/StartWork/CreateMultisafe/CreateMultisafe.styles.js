import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    width: '620px',
  },
  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 36,
  },
  subheader: {
    marginTop: 25,
  },
};

export const useStyles = makeStyles(styles, { name: 'CreateMultisafe' });
