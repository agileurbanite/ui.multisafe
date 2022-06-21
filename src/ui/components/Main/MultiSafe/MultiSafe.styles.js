import { makeStyles } from '@material-ui/core';

const styles = {
    container: {
        width: '100vw',
        minHeight: 'calc(100vh - 73px)',
        ['@media (min-width:768px)']: { // eslint-disable-line no-useless-computed-key
            display: 'grid',
            gridTemplateColumns: '256px auto',
            gridTemplateRows: 'auto',
            gridTemplateAreas: `
              'a b'
            `,
        },
    },
    content: {
        gridArea: 'b',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
};

export const useStyles = makeStyles(styles, { name: 'MultiSafe' });
