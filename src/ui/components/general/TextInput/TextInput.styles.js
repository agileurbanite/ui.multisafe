import { makeStyles } from '@material-ui/core';

const styles = {
  textField: {
    width: '100%',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  input: {
    backgroundColor: '#000',
    opacity: 0.08
  }
};

export const useStyles = makeStyles(styles, { name: 'TextInput' });
