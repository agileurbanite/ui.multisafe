import { makeStyles } from '@material-ui/core';

const styles = {
    textField: {
        fontSize: 20,
        fontWeight: 900,
    },
    description: {
        marginTop: 25,
        fontSize: 14,
    },
    textFieldInputRoot: {
        borderRadius: 8,
        fontWeight: 900,
        backgroundColor: '#eaeaea',
    },
    textFieldInputNotchedOutline: {
        border: 'none',
    },
    confirmationsField: {
        width: '50%',
    },
    confirmationInput: {
        fontWeight: 900,
        fontSize: 16,
    },
    amountField: {
        width: '50%',
    },
    amountInputRoot: {
        fontSize: 16,
        fontWeight: 900,
    },
    adornmentText: {
        marginLeft: 8,
        fontWeight: 700,
        userSelect: 'none',
    },
    icon: {
        height: 20,
        width: 20,
    },
    submitButton: {
        fontSize: 14,
        margin: '25px auto 16px',
        display: 'block',
    },
    createMultisafeBlock: {
        width: '100%',
        marginTop: 25,
    },
    policy: {
        marginTop: 25,
        fontSize: 14,
        textAlign: 'center',
    },
};

export const useStyles = makeStyles(styles, { name: 'Form' });
