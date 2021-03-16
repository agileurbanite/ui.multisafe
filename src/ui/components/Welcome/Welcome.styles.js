import { makeStyles } from '@material-ui/core';
import background from '../../images/welcome-page/background.svg';

const styles = {
  container: {
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: '17% 350px 70px auto',
    gridTemplateRows: '25% auto 52px',
    gridTemplateAreas: `
      'l . . .'
      '. a a .'
      'f f f f'
    `,
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
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
  },
  header: {
    fontSize: '60px',
    fontWeight: 900,
    letterSpacing: '-0.5px',
    color: '#ffffffde',
    margin: 0,
  },
  description: {
    marginTop: '16px',
    color: '#ffffffa0',
    lineHeight: 1.75,
    letterSpacing: '0.5px',
    margin: 0,
  },
  laptop: {
    gridArea: '2 / 3 / 3 / 5',
    width: '80%',
    minWidth: '500px',
    maxWidth: '1000px',
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
