import { makeStyles } from '@material-ui/core';

const styles = {
    header: {
        fontSize: 20,
        color: 'rgba(0, 0, 0, 0.87)',
        margin: 0,
    },
    description: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 14,
        margin: 0,
        marginTop: 20,
    },
    icons: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 24,
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 24,
    },
    cancel: {
        color: 'rgba(0, 0, 0, 0.6)',
        letterSpacing: 1.25,
        padding: 0,
        fontSize: 12,
        // marginRight: 24,
        fontWeight: 700,
    },
};

export const useStyles = makeStyles(styles, { name: 'ChooseWallet' });
