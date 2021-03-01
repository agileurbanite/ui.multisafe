import { TextField } from '@material-ui/core';
import { useStyles } from './TextInput.styles';

const TextInput = () => {
  const classes = useStyles();

  return (
    <form className={classes.form} noValidate autoComplete="off">
      <TextField
        id="search-multisafe"
        variant="outlined"
        color="secondary"
        className={classes.textField}
        placeholder="Search by name or address"
        InputProps={{
          className: classes.input,
        }}
      />
    </form>
  );
};

export { TextInput };
