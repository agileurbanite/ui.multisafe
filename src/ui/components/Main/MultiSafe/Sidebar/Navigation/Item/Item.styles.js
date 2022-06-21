import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
    container: {
        height: 56,
        display: 'flex',
        alignItems: 'center',
        color: ({ isActive }) => (isActive ? theme.palette.primary.main : theme.colors.dashboardGrey),
        '&:hover': {
            backgroundColor: theme.colors.dashboardHoverBgGrey,
        },
    },
    subContainer: {
        height: 36,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 48,
        color: ({ isActive }) => (isActive ? theme.palette.primary.main : theme.colors.dashboardGrey),
        '&:hover': {
            backgroundColor: theme.colors.dashboardHoverBgGrey,
        },
    },
    icon: {
        marginLeft: 24,
    },
    name: {
        marginLeft: 24,
    },
});

export const useStyles = makeStyles(styles, { name: 'Item' });
