import { InputAdornment, TextField, } from '@material-ui/core';
import { useController } from 'react-hook-form';

export const MultisafeField = (
  {
    control,
    name,
    defaultValue,
    type,
    label,
    variant,
    className,
  }
) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue,
  });

  if (type === 'number') {
    return (
        <TextField
          inputRef={ref}
          variant={variant}
          label={label}
          className={className}
          defaultValue={defaultValue}
          InputProps={{
            endAdornment: name !== 'num_confirmations' ? <InputAdornment position="end">NEAR</InputAdornment> : null,
          }}
        />
    );
  }

  return (
    <TextField
      inputRef={ref}
      variant={variant}
      label={label}
      className={className}
      value={defaultValue}
      {...inputProps}
    />
  )
};


