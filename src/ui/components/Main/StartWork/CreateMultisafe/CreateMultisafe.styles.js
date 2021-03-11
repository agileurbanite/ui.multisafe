import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    width: "620px"
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  subheader: {
    marginTop: 25
  },
};

export const useStyles = makeStyles(styles, { name: 'CreateMultisafe' });
