import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
  button: {
    gridArea: '1 / 3 / 3 / 4',
    padding: 0,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  popover: {
    borderRadius: 8,
    border: '1px solid #4b5aae1e',
  },
  container: {
    width: 180,
    userSelect: 'none',
  },
  exportCsv: {
    color: theme.palette.primary.main,
  },
  deleteCampaign: {
    color: theme.colors.red,
  },
});

export const useStyles = makeStyles(styles, { name: 'More' });
