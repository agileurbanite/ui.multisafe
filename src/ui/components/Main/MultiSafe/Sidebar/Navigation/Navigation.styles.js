import { makeStyles } from '@material-ui/core';

const styles = {
    container: {
        gridArea: 'c',
        color: 'white',
    },
};

export const useStyles = makeStyles(styles, { name: 'Navigation' });
