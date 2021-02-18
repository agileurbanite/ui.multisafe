import { makeStyles } from '@material-ui/core';
import backgroundImage from '../../images/landing_page_background/landing_page_background@2x.jpg';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  page: {
    height: 'calc(100vh - 52px)',
    display: 'grid',
    gridTemplateColumns: '17% 29% auto',
    gridTemplateRows: '25% auto',
    gridTemplateAreas: `
      '. . .'
      '. a .'
    `,
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat'
  },
  content: {
    gridArea: 'a'
  },
  header: {
    fontSize: '60px',
    fontWeight: 900,
    letterSpacing: '-0.5px',
    color: '#ffffffde',
    margin: 0
  },
  description: {
    marginTop: '16px',
    color: '#ffffffa0',
    lineHeight: 1.75,
    letterSpacing: '0.5px',
    margin: 0
  },
  getStarted: {
    marginTop: '36px'
  }
};

export const useStyles = makeStyles(styles, { name: 'Welcome' });
