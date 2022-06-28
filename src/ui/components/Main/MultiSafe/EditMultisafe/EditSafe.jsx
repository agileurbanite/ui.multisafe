import { useStyles } from './EditMultisafe.styles';
import { Form } from './Form/Form';

export const EditSafe = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.headerWrapper}>
                <h1 className={classes.title}>Edit Existing Multi Safe</h1>
            </div>
            <Form />
        </div>
    );
};
