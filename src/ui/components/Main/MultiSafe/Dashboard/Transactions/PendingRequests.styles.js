import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
    header: {
        margin: '30px 12px',
        fontSize: 24,
        fontWeight: 900,
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
});

export const useStyles = makeStyles(styles, { name: 'PendingRequests' });
