import { makeStyles } from '@material-ui/core';

const styles = {
    container: {
        display: 'flex',
        marginTop: 24,
        '&:first-child': {
            marginTop: 36,
        },
    },
    chevron: {
        color: '#00c08b',
    },
};

export const useStyles = makeStyles(styles, { name: 'BulletHeading' });
