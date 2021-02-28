import { Link as ButtonLink } from '@material-ui/core';
import { useStoreActions } from 'easy-peasy';
import { useHistory } from 'react-router-dom';
import { getConfig } from '../../../../../config/config';
import { useStyles } from './CreateMultisafeLink.styles';

export const CreateMulitsafeLink = ({ children }) => {
  const onPrepareContract = useStoreActions((a) => a.multisafe.onPrepareContract);
  const { push } = useHistory();
  const classes = useStyles();

  const onClick = () => {
    const multisafeId = getConfig().contractName;
    onPrepareContract({ push, multisafeId });
  };

  return (
    <section className={classes.container}>
      <div className={classes.icon}>+</div>
      <ButtonLink component="button" variant="body2" onClick={onClick} className={classes.link}>
        {children}
      </ButtonLink>
    </section>
  );
};
