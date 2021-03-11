import { Add, SystemUpdateAlt } from '@material-ui/icons';
import { emoji } from '../../../../config/emoji';
import { Headline } from '../../../general/Headline/Headline';
import { EmojiIcon } from '../../../general/EmojiIcon/EmojiIcon';
import { GreenLink } from '../../general/GreenLink/GreenLink';
import { MultisafeList } from './MultisafeList/MultisafeList';
import { routes } from '../../../../config/routes';
import { useStyles } from './GetStarted.styles';

export const GetStarted = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.pageHeader}>
        <div className={classes.emoji}>
          <EmojiIcon position="center" size={72} content={emoji.handRaised} elem="span" />
        </div>
        <div className={classes.titleBlock}>
          <Headline is={1}>
            Get started with Multisafe.
          </Headline>
          <Headline is={1}>
            Choose one of the options.
          </Headline>
        </div>
      </div>
      <div className={classes.multisafeActions}>
        <GreenLink to={routes.createMultisafe} text="Create new Multi Safe" icon={Add} />
        <GreenLink
          to={routes.loadMultisafe}
          text="Load existing Multi Safe"
          icon={SystemUpdateAlt}
        />
      </div>
      <MultisafeList />
    </div>
  );
};
