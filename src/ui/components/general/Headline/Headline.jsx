import * as R from 'ramda';
import cn from 'classnames';
import { useStyles } from './Headline.styles';

export const Headline = ({ textPosition, className, children, is, renderAs }) => {
  const classes = useStyles({ textPosition });
  const Hx = renderAs || `h${is}`;
  if (!is) return <Hx className={cn(classes.main, { textPosition }, R.propOr('', className))}>
    {children}
  </Hx>
  return (
    <Hx className={cn(classes.main, `is${is}`, { textPosition }, R.propOr('', className))}>
      {children}
    </Hx>
  );
};
