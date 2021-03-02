import { useHistory } from 'react-router-dom';
import { Typography, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { Form } from './Form/Form';
import { routes } from '../../../../config/routes';
import { useStyles } from './LoadMultisafe.styles';

export const LoadMultisafe = () => {
  const { push } = useHistory();
  const classes = useStyles();

  const goBack = () => push(routes.getStarted);

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
        You are about to load an existing Gnosis Safe. First, choose a name and enter the Safe
        address. The name is only stored locally and will never be shared with Gnosis or any third
        parties. Your connected wallet does not have to be the owner of this Safe. In this case, the
        interface will provide you a read-only view.
      </Typography>
      <Form />
    </div>
  );
};
