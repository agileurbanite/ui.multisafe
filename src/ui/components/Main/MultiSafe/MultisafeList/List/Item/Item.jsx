/* eslint-disable */
import { useHistory } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import { More } from './More/More';
import { emoji as emojiConfig } from '../../../../../../config/emoji';
import { getRoute } from '../../../../../../config/routes';
import { formatNearBalance } from '../../../../../../../utils/format';
import { useStyles } from './Item.styles';

export const Item = ({
  multisafe: { name, emoji = emojiConfig.foxMuzzle, multisafeId, balance },
}) => {
  const history = useHistory();
  const classes = useStyles();

  const goToMultisafe = () => history.push(getRoute.dashboard(multisafeId));

  return (
    <div className={classes.container} onClick={goToMultisafe} role="button">
      <span className={classes.emoji}>{emoji}</span>
      <span className={classes.name}>{name}</span>
      <span className={classes.balance}>{formatNearBalance(balance)}</span>
      <Divider className={classes.divider} />
      <More name={name} multisafeId={multisafeId} />
    </div>
  );
};
