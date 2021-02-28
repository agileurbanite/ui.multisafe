import { makeStyles } from '@material-ui/core';

const styles = {
  container: {},
  form: {},
  multisafeName: {
    display: 'flex',
    flexDirection: 'column'
  },
  membersList: {
    display: 'block'
  },
  membersListFields: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  addMemberInput: {
    '& *:not(:first-child)': {
      marginLeft: 20
    }
  },
  confirmations: {
    display: 'flex',
    flexDirection: 'column'
  },
  depositSection: {
    display: 'flex',
    flexDirection: 'column'
  }
};

export const useStyles = makeStyles(styles, { name: 'CreateMultisafe' });
