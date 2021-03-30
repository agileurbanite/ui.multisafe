import { makeStyles } from '@material-ui/core';

const styles = {
  container: {},
  tools: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  icon: {
    color: '#989898',
  },
};

export const useStyles = makeStyles(styles, { name: 'Actions' });
