import { KeyboardArrowRight } from '@material-ui/icons';
import { emoji } from '../../../../../config/emoji';
import { useStyles } from './Account.styles';

export const Account = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <span className={classes.emoji}>{emoji.foxMuzzle}</span>
      <span className={classes.name}>Safe Name</span>
      <span className={classes.multisafeId}>safe.multisafe.near</span>
      <KeyboardArrowRight className={classes.icon} />
    </div>
  );
};
