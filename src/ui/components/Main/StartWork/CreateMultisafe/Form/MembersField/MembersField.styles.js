import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    width: 620
  },
  addMemberInput: {},
  memberName: {
    width: '100%'
  },
  memberAddress: {
    width: '100%',
    marginLeft: 20
  },
  addButton: {},
  iconButton: {
    padding: '8px',
    margin: '0 16px',
  },
  icon: {
    color: '#989898',
    '&:hover': {
      color: '#e40029',
    },
  }
};

export const useStyles = makeStyles(styles, { name: 'MembersField' });
