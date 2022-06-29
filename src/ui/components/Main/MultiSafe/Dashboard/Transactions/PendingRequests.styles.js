import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    h2: {
        margin: '30px 12px',
        fontSize: 24,
        fontWeight: 900,
    },
    button: {
        height: 34,
    },
    noRequestsContainer: {
        height: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&>p': {
            fontSize: 24,
            fontWeight: 700,
            color: theme.colors.textGrey,
        },
    },
    batchRequest: {
        backgroundColor: '#dff7f0'
    }
});

export const useStyles = makeStyles(styles, { name: 'PendingRequests' });
