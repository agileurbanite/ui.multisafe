import { makeStyles } from '@material-ui/core';

const styles = () => ({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        height: 18,
        width: 18,
        marginRight: 9,
    },
});

export const useStyles = makeStyles(styles, { name: 'Type' });
