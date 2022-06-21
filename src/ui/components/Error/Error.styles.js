import { makeStyles } from '@material-ui/core';

const styles = {
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        outline: 'none',
        borderRadius: 8,
        padding: 16,
    },
    header: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontWeight: 900,
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
};

export const useStyles = makeStyles(styles, { name: 'Error' });
