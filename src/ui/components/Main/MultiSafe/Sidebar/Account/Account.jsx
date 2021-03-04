import { KeyboardArrowRight } from '@material-ui/icons';
import { useStoreState } from 'easy-peasy';
import { emoji } from '../../../../../config/emoji';
import { useStyles } from './Account.styles';

export const Account = () => {
  const name = useStoreState((s) => s.multisafe.name);
  const multisafeId = useStoreState((s) => s.multisafe.multisafeId);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <span className={classes.emoji}>{emoji.foxMuzzle}</span>
      <span className={classes.name}>{name}</span>
      <span className={classes.multisafeId}>{multisafeId}</span>
      <KeyboardArrowRight className={classes.icon} />
    </div>
  );
};
