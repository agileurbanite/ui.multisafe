import { makeStyles } from '@material-ui/core';

const styles = {
    copyToClipboard: {
        padding: '0',
        margin: '0 5px 0 10px',
    },
    openInExplorer: {
        padding: '0',
    },
    icon: {
        height: 16,
        width: 16,
        color: 'rgba(0, 0, 0, 0.54)',
        '&:hover': {
            color: '#989898',
        },
    },
};

export const useStyles = makeStyles(styles, { name: 'Recipient' });
