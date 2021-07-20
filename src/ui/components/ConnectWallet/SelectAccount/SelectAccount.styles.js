import { makeStyles } from '@material-ui/core';

const styles = {
  accounts: {
    display: 'flex',
    flexDirection: 'column',
  }
};

export const useStyles = makeStyles(styles, { name: 'SelectAccount' });
