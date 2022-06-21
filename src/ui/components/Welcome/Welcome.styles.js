import { makeStyles } from '@material-ui/core';

import background from '../../images/welcome-page/background.svg';

const styles = {
    container: {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        overflow: 'auto',
        display: 'grid',
        gridTemplateColumns: '100%',
        gridTemplateRows: '40px auto auto 52px',
        gridTemplateAreas: `
      'l'
      'a'
      'b'
      'f'
    `,
        ['@media (min-width:768px)']: { // eslint-disable-line no-useless-computed-key
            gridTemplateColumns: '17% 350px 70px auto',
            gridTemplateRows: '25% auto 52px',
            gridTemplateAreas: `
      'l . . .'
      '. a a .'
      'f f f f'
    `,
        }
    },
    logo: {
        gridArea: 'l',
        width: '182px',
        margin: '18px 0 0 24px',
    },
    content: {
        gridArea: 'a',
        display: 'flex',
        flexDirection: 'column',
        ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
            padding: '50px 20px'
        }
    },
    header: {
        fontSize: '40px',
        fontWeight: 900,
        letterSpacing: '-0.5px',
        color: '#ffffffde',
        margin: 0,
        ['@media (min-width:768px)']: { // eslint-disable-line no-useless-computed-key
            fontSize: '60px',
        }
    },
    description: {
        marginTop: '16px',
        color: '#ffffffa0',
        lineHeight: 1.75,
        letterSpacing: '0.5px',
        margin: 0,
        ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
            maxWidth: '240px'
        }
    },
    laptop: {
        width: '80%',
        margin: '0 auto',
        display: 'block',
        gridArea: 'b',
        ['@media (min-width:768px)']: { // eslint-disable-line no-useless-computed-key
            gridArea: '2 / 3 / 3 / 5',
            marginLeft: 'unset',
            minWidth: '500px',
            maxWidth: '1000px',
        }
    },
    footer: {
        gridArea: 'f',
    },
    getStarted: {
        width: 236,
        marginTop: 36,
    },
    tryDemo: {
        width: 236,
        marginTop: 16,
        borderRadius: 8,
        padding: 11,
        borderColor: 'rgba(255, 255, 255, 0.12)',
        letterSpacing: 1.25,
        fontWeight: 700,
    },
};

export const useStyles = makeStyles(styles, { name: 'Welcome' });
