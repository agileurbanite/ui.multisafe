import { makeStyles } from '@material-ui/core';

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export const useStyles = makeStyles(styles, { name: 'PageNotFound' });
