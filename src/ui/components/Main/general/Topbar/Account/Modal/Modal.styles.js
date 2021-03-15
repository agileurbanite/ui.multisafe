import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    width: 280,
  },
  account: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  nearIcon: {
    height: 40,
    width: 40,
    marginTop: 40,
  },
  accountId: {
    width: '90%',
    margin: '28px 0 16px 0',
    fontWeight: 700,
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    textAlign: 'center',
  },
  tools: {
    marginBottom: 16,
  },
  footer: {
    height: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disconnect: {
    letterSpacing: 1.25,
    fontWeight: 700,
    borderRadius: 8,
  },
};

export const useStyles = makeStyles(styles, { name: 'Modal' });
