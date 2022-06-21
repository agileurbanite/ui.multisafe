import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
    container: {
        width: '100%',
        minHeight: 56,
        display: 'grid',
        gridTemplateColumns: '56px auto 30px',
        gridTemplateRows: 'auto auto',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#e9e9e9',
        },
    },
    emoji: {
        gridArea: '1 / 1 / 3 / 2',
        justifySelf: 'center',
        alignSelf: 'center',
        fontSize: 18,
    },
    name: {
        gridArea: '1 / 2 / 2 / 3',
        width: '90%',
        fontWeight: 700,
        lineHeight: 1.5,
        alignSelf: 'end',
        marginTop: 8,
        overflowWrap:'anywhere'
    },
    balance: {
        gridArea: '2 / 2 / 3 / 3',
        fontSize: 14,
        margin: '5px 0 8px 0',
        color: '#626262',
    },
    divider: {
        gridArea: '2 / 2 / 3 / 4',
        alignSelf: 'end',
        backgroundColor: theme.colors.dividerOnWhite,
    },
});

export const useStyles = makeStyles(styles, { name: 'Item' });
