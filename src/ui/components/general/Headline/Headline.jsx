import { propOr } from 'ramda';
import cn from 'classnames';
import { useStyles } from './Headline.styles';

const Headline = ({ isCenter, className, children, is, renderAs, ...restProps }) => {
  const classes = useStyles();
  const Hx = renderAs || `h${is}`;

  return (
    <Hx
      className={cn(classes.main, `is${is}`, {isCenter}, propOr('', className))}
      {...restProps}
    >
      {children}
    </Hx>
  )
};

export { Headline };
