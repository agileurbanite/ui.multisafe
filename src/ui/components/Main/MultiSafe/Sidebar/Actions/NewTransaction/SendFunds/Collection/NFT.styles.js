import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
    media: {
        cursor: 'pointer',
        margin: 'auto',
        display: 'flex',
        maxWidth: '100%',
        maxHeight: '100%',
        width: 50,
        height: 50,
    },
    img: {
        cursor: 'pointer',
        marginLeft: 15,
        display: 'flex',
        maxWidth: '100%',
        maxHeight: '100%',
        width: 50,
        height: 50,
    },
    listItem: {
        cursor: 'pointer',
        backgroundColor: ({isActive}) => isActive && theme.palette.primary.light,
        borderTop: '1px solid rgb(240, 240, 241)',
        '&:last-of-type': {
            borderBottom: '1px solid rgb(240, 240, 241)',
        },
        '& p, span': {
            color: ({isActive}) => isActive && 'white',
        }
    }
});

export const useStyles = makeStyles(styles, { name: 'NFT' });
