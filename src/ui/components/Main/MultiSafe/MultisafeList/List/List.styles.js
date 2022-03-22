import { makeStyles } from '@material-ui/core';

const styles = {
  title: {
    color: 'rgba(0, 0, 0, 0.5)',
    margin: '24px 0 8px 56px',
  }
};

export const useStyles = makeStyles(styles, { name: 'List' });
