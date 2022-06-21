import { useStyles } from './EditMultisafe.styles';
import { FormName } from './Form/FormName';

export const EditName = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.headerWrapper}>
                <h1 className={classes.title}>Edit Existing Multi Safe</h1>
            </div>
            <FormName />
        </div>
    );
};
