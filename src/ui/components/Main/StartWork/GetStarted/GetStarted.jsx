import { emojiDict } from '../../../../emoji';
import { Headline } from '../../../general/Headline/Headline';
import { EmojiIcon } from '../../../general/EmojiIcon/EmojiIcon';
import { MultisafeList } from './MultisafeList/MultisafeList';
import { Link } from './Link/Link';
import { routes } from '../../../../config/routes';
import { useStyles } from './GetStarted.styles';

export const GetStarted = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.pageHeader}>
        <div className={classes.emoji}>
          <EmojiIcon position="center" size={72} content={emojiDict.handRaised} elem="span" />
        </div>
        <div className={classes.titleBlock}>
          <Headline isCenter is={1}>
            Get started with Multisafe.
          </Headline>
          <Headline isCenter is={1}>
            Choose one of the options.
          </Headline>
        </div>
      </div>
      <div className={classes.multisafeActions}>
        <Link to={routes.createMultisafe} text="Create Multi Safe" />
        <Link to={routes.loadMultisafe} text="Load existing Multisafe" />
      </div>
      <MultisafeList />
    </div>
  );
};
