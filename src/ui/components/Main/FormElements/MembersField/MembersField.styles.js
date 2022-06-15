import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    width: 620,
  },
  memberAddress: {
    width: '100%',
  },
  memberAddressInput: {
    fontSize: 16,
    fontWeight: 900,
  },
  addButton: {
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: 8,
  },
  iconButton: {
    padding: '8px',
    margin: '0 16px',
  },
  icon: {
    color: '#989898',
    '&:hover': {
      color: '#e40029',
    },
  },
  addIcon: {
    color: '#00c08b',
  },
};

export const useStyles = makeStyles(styles, { name: 'MembersField' });
