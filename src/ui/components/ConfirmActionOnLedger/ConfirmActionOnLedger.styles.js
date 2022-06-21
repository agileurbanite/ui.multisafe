import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backdropRoot: {
        backgroundColor: 'inherit',
        backdropFilter: 'blur(3px)',
    },
    container: {
        width: 400,
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
    imageWrapper: {
        minHeight: 113,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 36,
    },
    ledgerDeviceImage: {
        width: 300,
    },
    content: {
        minHeight: 50,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 36,
    },
    actionName: {
        margin: 0,
        fontSize: 18,
    },
    loaderWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    error: {
        margin: 0,
        fontSize: 16,
        color: theme.colors.red,
    },
    footer: {
        height: 22,
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 24,
    },
    gotIt: {
        color: 'rgba(0, 0, 0, 0.6)',
        letterSpacing: 1.25,
        padding: 0,
        fontSize: 12,
        fontWeight: 700,
    },
});

export const useStyles = makeStyles(styles, { name: 'ConfirmActionOnLedger' });
