import * as R from 'ramda';
import cn from 'classnames';
import { useStyles } from './Headline.styles';

export const Headline = ({ isCenter, className, children, is, renderAs, ...restProps }) => {
  const classes = useStyles();
  const Hx = renderAs || `h${is}`;

  return (
    <Hx
      className={cn(classes.main, `is${is}`, { isCenter }, R.propOr('', className))}
      {...restProps}>
      {children}
    </Hx>
  );
};
