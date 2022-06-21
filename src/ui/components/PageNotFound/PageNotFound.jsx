import { useStyles } from './PageNotFound.styles';

export const PageNotFound = () => {
    const classes = useStyles();
    return <div className={classes.container}>Page not found 404</div>;
};
