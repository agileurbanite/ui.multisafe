import { Link as RouterLink } from 'react-router-dom';
import { ContentSeparator } from '../../../../general/ContentSeparator/ContentSeparator';
import { useStyles } from './Link.styles';

export const Link = ({ to, text }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.multisafeAction}>
        <RouterLink to={to} className={classes.routeLink}>
          <div className={classes.routeIcon}>
            <span className={classes.icon}>+</span>
          </div>
          <span className={classes.routeName}>{text}</span>
        </RouterLink>
      </div>
      <ContentSeparator height={1} bg="#000" />
    </>
  );
};
