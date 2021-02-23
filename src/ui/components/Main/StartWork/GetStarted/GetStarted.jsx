import { Link } from 'react-router-dom';
import { emojiDict } from '../../../../emoji';
import { routes } from '../../../../config/routes';
import { useStyles } from './GetStarted.styles';
import { Headline } from '../../../general/Headline/Headline';
import { EmojiIcon } from '../../../general/EmojiIcon/EmojiIcon';
import { TextInput } from '../../../general/TextInput/TextInput';
import { ContentSeparator } from '../../../general/ContentSeparator/ContentSeparator';

export const GetStarted = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.contentWrapper}>
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
        <div className={classes.searchForm}>
          <TextInput />
        </div>
        <div className={classes.multisafeActions}>
          <section className={classes.multisafeAction}>
            <Link to={routes.createMultisafe} className={classes.routeLink}>
              <div className={classes.routeIcon}>
                <span className={classes.icon}>+</span>
              </div>
              <span className={classes.routeName}>
                Create new Multisafe
              </span>
            </Link>
          </section>
          <ContentSeparator height={1} bg="#000"/>
          <section className={classes.multisafeAction}>
            <Link to={routes.loadMultisafe} className={classes.routeLink}>
              <div className={classes.routeIcon}>
                <span className={classes.icon}>-</span>
              </div>
              <span className={classes.routeName}>
                Load existing Multisafe
              </span>
            </Link>
          </section>
          <ContentSeparator height={1} bg="#000"/>
          <Link to="/multisafe/1/dashboard">Safe Name test.testnet</Link>
        </div>
        <div className={classes.readOnlyMultisaves}>[::list of multisaves::]</div>
      </div>
    </div>
  );
};
