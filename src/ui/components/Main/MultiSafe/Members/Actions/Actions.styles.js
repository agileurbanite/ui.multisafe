import { makeStyles } from '@material-ui/core';

const styles = {
    tools: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    icon: {
        width: 20,
        height: 20,
        color: '#989898',
    },
};

export const useStyles = makeStyles(styles, { name: 'Actions' });
