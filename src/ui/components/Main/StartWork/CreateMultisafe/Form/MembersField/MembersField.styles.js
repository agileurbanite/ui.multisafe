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
  addButton: {}
};

export const useStyles = makeStyles(styles, { name: 'MembersField' });
