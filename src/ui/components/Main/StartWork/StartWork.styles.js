import { makeStyles } from '@material-ui/core';

const styles = {
    container: {
        width: '100vw',
        minHeight: 'calc(100vh - 73px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
};

export const useStyles = makeStyles(styles, { name: 'StartWork' });
