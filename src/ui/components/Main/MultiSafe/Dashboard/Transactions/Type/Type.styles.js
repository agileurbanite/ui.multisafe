import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        height: 18,
        width: 18,
        color: theme.colors.red,
        marginRight: 9,
    },
});

export const useStyles = makeStyles(styles, { name: 'Type' });
