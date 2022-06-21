import { makeStyles } from '@material-ui/core';

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 25,
    },
    textField: {
        width: '100%',
        marginTop: 25,
        '&:first-child': {
            marginTop: 0,
        },
    },
    terms: {
        marginTop: 25,
    },
    divider: {
        width: '100%',
        marginTop: 25,
    },
    submitButton: {
        width: '50%',
        marginTop: 25,
    },
};

export const useStyles = makeStyles(styles, { name: 'Form' });
