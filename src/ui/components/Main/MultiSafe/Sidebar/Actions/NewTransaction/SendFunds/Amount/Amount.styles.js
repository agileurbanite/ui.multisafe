import { makeStyles } from '@material-ui/core';

const styles = {
    icon: {
        height: 20,
        width: 20,
    },
    textField: {
        fontSize: 20,
        fontWeight: 900,
    },
    adornmentText: {
        marginLeft: 8,
        fontWeight: 700,
        userSelect: 'none',
    },
    helperContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '3px 12px 24px 12px',
        color: 'rgba(0, 0, 0, 0.6)',
    },
    balance: {
        fontSize: 12,
        lineHeight: 1.6,
        color: 'rgba(0, 0, 0, 0.6)',
    },
    sendMax: {
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 1.6,
        padding: 0,
        textTransform: 'none',
        letterSpacing: 0.4,
    },
};

export const useStyles = makeStyles(styles, { name: 'Amount' });
