import { useStoreState } from 'easy-peasy';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useStyles } from './CreateMultisafe.styles';
import { Form } from './Form/Form';
import { redirectBack } from '../general/redirectBack';

export const CreateMultisafe = () => {
  const hasSavedMultisafes = useStoreState((store) => store.general.selectors.hasSavedMultisafes);
  const multisafeId = useStoreState((store) => store.multisafe.general.multisafeId);
  const classes = useStyles();
  const { push } = useHistory();

  const goBack = () => redirectBack(hasSavedMultisafes, multisafeId, push);

  return (
    <div className={classes.container}>
      <div className={classes.headerWrapper}>
        <IconButton onClick={goBack} className={classes.goBack}>
          <ArrowBack className={classes.icon} />
        </IconButton>
        <h1 className={classes.title}>Create New Multi Safe</h1>
      </div>
      <Form />
    </div>
  );
};
