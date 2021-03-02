import { TextField as MuiTextField } from '@material-ui/core';
import { useController } from 'react-hook-form';

export const TextField = ({
  control,
  name,
  defaultValue = '',
  variant,
  placeholder,
  className,
}) => {
  const { field } = useController({ name, control, defaultValue });
  return (
    <MuiTextField
      inputRef={field.ref}
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      variant={variant}
      placeholder={placeholder}
      className={className}
    />
  );
};
