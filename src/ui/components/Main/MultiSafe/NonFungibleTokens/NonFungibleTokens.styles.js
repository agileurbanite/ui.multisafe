import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    width: 'calc(100% - 48px)',
  },
  media: {
    margin: 'auto',
    display: 'flex',
    maxWidth: '100%',
    maxHeight: '100%',
    width: 400,
    height: 260,
  },
  header: {
    margin: '30px 12px',
    fontWeight: 900,
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    width: 400,
    height: 400,
    margin: '20px',
  },
  img: {
    margin: 'auto',
    display: 'flex',
    maxWidth: '100%',
    maxHeight: '100%',
    width: 260,
    height: 260,
  },
  collectionTitle: {
    marginRight: '100px',
  },
  nft: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 20px',
  }
};

export const useStyles = makeStyles(styles, { name: 'NonFungibleTokens' });
