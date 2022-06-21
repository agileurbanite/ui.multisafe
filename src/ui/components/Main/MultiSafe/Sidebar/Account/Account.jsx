import { KeyboardArrowRight } from '@material-ui/icons';
import { useStoreState } from 'easy-peasy';

import { emoji } from '../../../../../config/emoji';
import { useStyles } from './Account.styles';

export const Account = ({ onToggleList }) => {
    const name = useStoreState((s) => s.multisafe.general.name);
    const multisafeId = useStoreState((s) => s.multisafe.general.multisafeId);
    const classes = useStyles();

    return (
        <div className={classes.container} onClick={onToggleList} aria-hidden>
            <span className={classes.emoji}>{emoji.foxMuzzle}</span>
            <span className={classes.name}>{name}</span>
            <span className={classes.multisafeId}>{multisafeId}</span>
            <KeyboardArrowRight className={classes.icon} />
        </div>
    );
};
