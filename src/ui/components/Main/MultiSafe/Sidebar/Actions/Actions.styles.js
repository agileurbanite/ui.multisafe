import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: '24px auto 24px',
        gridTemplateRows: '12px auto 12px auto 24px auto',
        gridTemplateAreas: `
      '. . .'
      '. a .'
      '. . .'
      '. b .'
      '. . .'
      '. c .'
    `,
    },
    tools: {
        gridArea: 'a',
        display: 'flex',
        justifyContent: 'center',
    },
    iconButton: {
        padding: '8px',
        margin: '0 16px',
    },
    icon: {
        color: '#989898',
        '&:hover': {
            color: 'white',
        },
    },
    balance: {
        gridArea: 'b',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#434343',
        borderRadius: '8px',
        '&>span': {
            color: '#ffffff',
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: '0.5px',
        },
    },
    readOnly: {
        gridArea: 'c',
        height: 34,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.colors.dashboardGrey,
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: '1.5px',
        border: '1px solid #ffffff1e',
        borderRadius: 8,
        userSelect: 'none',
    },
});

export const useStyles = makeStyles(styles, { name: 'Actions' });
