import { Link } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import { emoji as emojiConfig } from '../../../../../../../config/emoji';
import { getRoute } from '../../../../../../../config/routes';
import { formatNearBalance } from '../../../../../../../utils/format';
import { useStyles } from './Item.styles';

export const Item = ({
  multisafe: { name, emoji = emojiConfig.foxMuzzle, multisafeId, balance },
}) => {
  const classes = useStyles();
  return (
    <Link to={getRoute.dashboard(multisafeId)}>
      <div className={classes.container}>
        <span className={classes.emoji}>{emoji}</span>
        <span className={classes.name}>{name}</span>
        <span className={classes.balance}>{formatNearBalance(balance)}</span>
        <Divider className={classes.divider} />
      </div>
    </Link>
  );
};
