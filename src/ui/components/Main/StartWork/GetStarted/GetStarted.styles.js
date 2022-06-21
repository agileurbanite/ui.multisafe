import { makeStyles } from '@material-ui/core';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    pageHeader: {
        display: 'flex',
        marginTop: '36px',
    },
    emoji: {
        width: 69,
        height: 80,
        marginRight: '24px',
    },
    titleBlock: {
        display: 'flex',
        flexDirection: 'column',
    },
    multisafeActions: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '16px',
    },
};

export const useStyles = makeStyles(styles, { name: 'GetStarted' });
