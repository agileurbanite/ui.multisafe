import { makeStyles } from '@material-ui/core';

const isConfirmed =
  (yes, no) =>
      ({ hasUserConfirm }) =>
          hasUserConfirm ? yes : no;

const styles = (theme) => ({
    tableCell: {
        padding: '0 16px',
        width: 150,
    },
    container: {
        display: 'flex',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 8,
        padding: '8px 16px',
        backgroundColor: isConfirmed(theme.palette.primary.main, '#ffffff'),
        color: isConfirmed('#ffffff', 'rgba(0, 0, 0, 0.6)'),
        border: '1px solid',
        borderColor: isConfirmed(theme.palette.primary.main, 'rgba(0, 0, 0, 0.12)'),
        outline: 'none',
        cursor: isConfirmed('inherit', 'pointer'),
        '&:hover': {
            borderColor: theme.palette.primary.main,
        },
        marginLeft: ({ hideDelete }) => hideDelete ? 54 : 0,
    },
    disabledButton: {
        cursor: 'default!important',
        '&:hover': {
            borderColor: 'rgba(0, 0, 0, 0.12)',
        },
    },
    doneIcon: {
        height: 18,
        width: 18,
        color: isConfirmed('#ffffff', theme.palette.primary.main),
    },
    description: {
        letterSpacing: '1.25px',
        marginLeft: 8,
        fontWeight: 700,
    },
    cancel: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 8,
        padding: '6px 11px',
        outline: 'none',
        backgroundColor: '#ffffff',
        cursor: 'pointer',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        marginLeft: ({ hideConfirm }) => hideConfirm ? 92 : 10,
        '&:hover': {
            borderColor: theme.colors.red,
        },
    },
    cancelIcon: {
        height: 20,
        width: 20,
        color: ({ canDelete }) => (canDelete ? theme.colors.red : theme.colors.dashboardGrey),
    },
});

export const useStyles = makeStyles(styles, { name: 'Status' });
