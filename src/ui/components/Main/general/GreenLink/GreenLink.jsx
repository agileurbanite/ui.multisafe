import { Link } from 'react-router-dom';
import { useStyles } from './GreenLink.styles';

export const GreenLink = ({ to, text, icon }) => {
  const classes = useStyles();
  const Icon = icon;
  return (
    <Link to={to}>
      <div className={classes.container}>
        <div className={classes.iconContainer}>
          <Icon className={classes.icon} />
        </div>
        <div className={classes.textContainer}>
          <span className={classes.text}>{text}</span>
        </div>
      </div>
    </Link>
  );
};
