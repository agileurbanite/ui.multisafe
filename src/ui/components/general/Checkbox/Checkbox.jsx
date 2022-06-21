import { Checkbox as MuiCheckbox, FormControlLabel } from '@material-ui/core';
import { useController } from 'react-hook-form';

export const Checkbox = ({ control, name, label, defaultValue, muiClasses, color }) => {
    const { field } = useController({ name, control, defaultValue });
    const onChange = (e) => field.onChange(e.target.checked);
    return (
        <FormControlLabel
            control={<MuiCheckbox checked={field.value} onChange={onChange} name={name} color={color} />}
            label={label}
            classes={muiClasses}
        />
    );
};
