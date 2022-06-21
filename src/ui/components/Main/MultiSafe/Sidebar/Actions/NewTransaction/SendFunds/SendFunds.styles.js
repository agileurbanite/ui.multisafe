import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
    container: {
        width: 380,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    form: {
        marginTop: 20,
    },
    textField: {
        marginBottom: 24,
        fontSize: 20,
        fontWeight: 900,
    },
    textFieldInputRoot: {
        borderRadius: 8,
        backgroundColor: '#eaeaea',
    },
    textFieldInputNotchedOutline: {
        border: 'none',
    },
    readOnlyField: {
        minWidth: 332,
        marginBottom: 24,
    },
    checkboxLabel: {
        fontWeight: 700,
        fontSize: 14,
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 24,
    },
    cancel: {
        color: theme.colors.textGrey,
        minWidth: 'auto',
        letterSpacing: 1.25,
        padding: 0,
        fontSize: 12,
        fontWeight: 700,
    },
    send: {
        color: theme.palette.primary.main,
        marginLeft: 14,
    },
});

export const useStyles = makeStyles(styles, { name: 'SendFunds' });
