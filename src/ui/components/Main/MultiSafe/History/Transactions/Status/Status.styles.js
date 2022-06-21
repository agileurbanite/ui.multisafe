import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
    status: {
        color: ({ status }) => (status === 'deleted' ? theme.colors.red : theme.palette.primary.main),
        textTransform: 'capitalize',
    },
});

export const useStyles = makeStyles(styles, { name: 'Status' });
