import cn from 'classnames';
import { useStyles } from './Footer.styles';

export const Footer = ({ classNames, variant }) => {
  const classes = useStyles({ variant });
  return (
    <div className={cn(classes.container, classNames?.container)}>
      <p className={classes.text}>©{new Date().getFullYear()} Multi Safe</p>
    </div>
  );
};
