import { useStoreState } from 'easy-peasy';
import { useHistory } from 'react-router-dom';
import { Typography, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { Form } from './Form/Form';
import { redirectBack } from '../general/redirectBack';
import { useStyles } from './LoadMultisafe.styles';

export const LoadMultisafe = () => {
  const hasSavedMultisafes = useStoreState((store) => store.general.selectors.hasSavedMultisafes);
  const multisafeId = useStoreState((store) => store.multisafe.general.multisafeId);
  const { push } = useHistory();
  const classes = useStyles();

  const goBack = () => redirectBack(hasSavedMultisafes, multisafeId, push);

  return (
    <div className={classes.container}>
      <div className={classes.headerWrapper}>
        <IconButton onClick={goBack}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4">Load existing Multi Safe</Typography>
      </div>
      <Typography variant="h5" className={classes.subheader}>
        Multi Safe Name and Address
      </Typography>
      <Typography className={classes.description}>
        You are about to load an existing Multi Safe. First, choose a name and enter the Safe
        address. The name is only stored locally and will never be shared with NEAR or any third
        parties. Your connected wallet does not have to be the owner of this Safe. In this case, the
        interface will provide you a read-only view.
      </Typography>
      <Form />
    </div>
  );
};
