import { makeStyles } from '@material-ui/core';

const styles = {
  form: {},
  textField: {
    width: "100%"
  },
  confirmationsField: {
    width: '50%'
  },
  description: {
    marginTop: 25,
    fontSize: 14
  },
  terms: {},
  submitButton: {
    width: '50%',
    margin: '25px auto 16px',
    display: 'block'
  },
  createMultisafeBlock: {
    width: '100%',
    marginTop: 25
  }
}

export const useStyles = makeStyles(styles, { name: 'Form' });
