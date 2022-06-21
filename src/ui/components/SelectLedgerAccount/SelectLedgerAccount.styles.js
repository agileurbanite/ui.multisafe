import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backdropRoot: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
    container: {
        width: 380,
        display: 'flex',
        flexDirection: 'column',
        outline: 'none',
        borderRadius: 8,
    },
    wrapper: {
        margin: '24px 24px 16px 24px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
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
    noAccounts: {
        margin: 0,
        marginTop: 20,
        '&>a': {
            color: theme.palette.primary.main,
        },
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
        fontWeight: 700,
    },
    select: {
        color: theme.palette.primary.main,
    },
});

export const useStyles = makeStyles(styles, { name: 'SelectLedgerAccount' });
