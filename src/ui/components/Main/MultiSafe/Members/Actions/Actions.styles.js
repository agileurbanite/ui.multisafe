import { makeStyles } from '@material-ui/core';

const styles = {
  container: {},
  tools: {
    display: "flex",
    justifyContent: "flex-end"
  },
  divider: {
    alignSelf: 'center',
    height: 24
  },
  removeButton: {
    '&:hover': {
      color: "#e40029"
    }
  },
  icon: {
    color: '#989898'
  },
};

export const useStyles = makeStyles(styles, { name: 'Actions' });
