import * as R from 'ramda';
import cn from 'classnames';
import { useStyles } from './Headline.styles';

export const Headline = ({ textAlign, className, children, is, renderAs }) => {
  const classes = useStyles({ textAlign });
  const Hx = renderAs || `h${is}`;
  if (!is) return <Hx className={cn(classes.main, { textAlign }, R.propOr('', className))}>
    {children}
  </Hx>
  return (
    <Hx className={cn(classes.main, `is${is}`, { textAlign }, R.propOr('', className))}>
      {children}
    </Hx>
  );
};
