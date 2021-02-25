import { FilledInput, InputAdornment, TextField } from '@material-ui/core';
import { useController } from 'react-hook-form';

export const MultisafeField = ({ control, name, defaultValue, type }) => {
  const {
    field: { ref, ...inputProps }
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue,
    type
  });

  if (type === 'number')
    return (
      <FilledInput
        endAdornment={<InputAdornment position="end">NEAR</InputAdornment>}
        aria-describedby="filled-weight-helper-text"
        {...inputProps}
        inputRef={ref}
      />
    );
  return <TextField {...inputProps} inputRef={ref} variant="filled" />;
};
