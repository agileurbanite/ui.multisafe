import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
    container: {
        width: 385,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        outline: 'none',
        borderRadius: 8,
        maxHeight: '500px',
        overflowY: 'auto',
    },
    wrapper: {
        margin: '24px 24px 16px 24px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    paper: {
        position: 'fixed',
        left: '40%',
        top: '10%',
        overflow: 'hidden',
    },
    directory: {
        display: 'flex',
        flexDirection: 'row', 
    },
    tabs: {
        display: 'flex',
    },
    tab: {
        flex: '1',
        textAlign: 'center',
    },
    form: {
        marginTop: 20,
        width: 320,
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
        justifyContent: 'flex-end'
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
