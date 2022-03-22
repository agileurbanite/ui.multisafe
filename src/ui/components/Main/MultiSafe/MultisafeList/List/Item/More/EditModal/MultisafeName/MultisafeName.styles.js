import {makeStyles} from '@material-ui/core';

const styles = {
  textField: {
    fontSize: 20,
    fontWeight: 900,
  },
  textFieldInputRoot: {
    borderRadius: 8,
    backgroundColor: '#eaeaea',
  },
  textFieldInputNotchedOutline: {
    border: 'none',
  },
}

export const useStyles = makeStyles(styles, { name: 'MultisafeName' });
