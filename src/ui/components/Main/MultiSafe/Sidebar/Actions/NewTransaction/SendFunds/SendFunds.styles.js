import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    width: 380,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    outline: 'none',
    borderRadius: 8,
  },
  wrapper: {
    width: 'calc(100% - 32px)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    margin: '30px 0',
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 900,
  },
  textField: {
    marginBottom: 24,
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
  checkboxLabel: {
    fontWeight: 700,
  },
  footer: {
    height: 70,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cancel: {
    color: 'grey',
    marginRight: 16,
  },
};

export const useStyles = makeStyles(styles, { name: 'SendFunds' });
