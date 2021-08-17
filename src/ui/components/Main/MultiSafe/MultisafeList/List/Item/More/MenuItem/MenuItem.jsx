import classnames from 'classnames';
import { useStyles } from './MenuItem.styles';

export const MenuItem = ({ icon, text, onClick, classNames = {} }) => {
  const classes = useStyles();
  const Icon = icon;

  return (
    <button className={classes.container} type="button" onClick={onClick}>
      <Icon className={classnames(classes.icon, classNames.icon)} />
      <span className={classes.text}>{text}</span>
    </button>
  );
};
