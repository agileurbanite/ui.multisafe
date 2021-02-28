import { useHistory } from 'react-router-dom';
import { useStyles } from './LoadMultisafe.styles';
import { Headline } from '../../../general/Headline/Headline';

export const LoadMultisafe = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <button type="button" onClick={() => history.goBack()}>
        Back
      </button>
      <Headline is={1}>Load existing Multi Safe</Headline>
    </div>
  );
};
