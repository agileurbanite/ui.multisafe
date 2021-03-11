import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { Headline } from '../../../general/Headline/Headline';
import { useStyles } from './CreateMultisafe.styles';
import { Form } from './Form/Form'
import { routes } from '../../../../config/routes';

export const CreateMultisafe = () => {
  const classes = useStyles();
  const { push } = useHistory();

//  TODO: Create reusable goBack function
  const goBack = () => push(routes.getStarted)

  return (
    <div className={classes.container}>
      <div className={classes.headerWrapper}>
        <IconButton onClick={goBack}>
          <ArrowBack />
        </IconButton>
        <Headline is={1}>Create New Multi Safe.</Headline>
      </div>
      <Form />
    </div>
  );
};
