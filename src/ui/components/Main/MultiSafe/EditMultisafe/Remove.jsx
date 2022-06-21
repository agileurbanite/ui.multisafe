import { useStyles } from './EditMultisafe.styles';
import { FormRemove } from './Form/FormRemove';

export const Remove = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.headerWrapper}>
                <h1 className={classes.title}>Remove Multi Safe</h1>
            </div>
            <FormRemove />
        </div>
    );
};
